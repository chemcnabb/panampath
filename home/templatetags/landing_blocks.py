from django import template
from zinnia.models import Category
from django.utils import timezone

register = template.Library()
from panampath.models import PathSegment
import datetime
from django.db.models import Q

@register.filter(name='get_value_at')
def get_value_at(_list, index):
    return _list[index]




def get_lastday(current):
    # _first_day = current.replace(day=1)
    prev_month_lastday = current - datetime.timedelta(days=1)
    return prev_month_lastday.replace(day=1)

@register.inclusion_tag('tags/home_block.html', takes_context=True)
def home_block(context, category, class_style=""):
    """
    Return the featured entries.
    """
    return_dict = {'category': category, "class_style": class_style}
    segments = PathSegment.objects.all()
    coords = []
    segment_popups = []
    for segment in segments:
        try:
            if "coordinates" in segment.geom:

                for member in segment.geom['coordinates']:
                    new_segment = []
                    for item in member:

                        new_segment.append(item[::-1])
                    segment_popups.append("<br /><strong>{}</strong><br /> {}".format(segment.title, segment.description))
                    coords.append(new_segment)
        except TypeError:
            pass
    # pprint(coords)
    return_dict["coordinates"] = coords
    return_dict["popups"] = segment_popups




    events = None
    if category.lower() == "events":
        events = Category.published.filter(slug__in=['events'])
        print events
        if events:
            last_day = get_lastday(datetime.datetime.now())
            print last_day
            events = events[0].entries_published().filter(Q(publication_date__gte=last_day), Q(end_publication__isnull=True) | Q(end_publication__gte=timezone.now()))
            print events
        return_dict["events"] = events


    stories = None
    if category.lower() == "stories":
        stories = Category.published.filter(slug__in=['stories'])
        if stories:
            stories = stories[0].entries_published()
        return_dict["stories"] = stories
    return return_dict
