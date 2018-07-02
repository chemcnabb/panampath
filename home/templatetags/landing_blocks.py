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


from pprint import pprint

def get_curmonth_first(current):
    next_month = datetime.datetime(current.year + (datetime.datetime.now().month / 12), ((datetime.datetime.now().month % 12)), 1)

    return next_month

@register.inclusion_tag('tags/home_block.html', takes_context=True)
def home_block(context, category, class_style="", url=None):
    """
    Return the featured entries.
    """
    return_dict = {'category': category, "class_style": class_style, 'url':url}
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

        if events:
            #last_day = get_curmonth_first(datetime.datetime.now())
            #print last_day
            events = events[0].entries_published().filter(Q(end_publication__isnull=True) | Q(end_publication__gte=timezone.now()))
            for event in events:
                if event.end_publication == None and event.start_publication == None:
                    event.publication_date = get_curmonth_first(event.publication_date)
                    # print "saving model"
                    event.save()
        return_dict["published_events"] = events


    stories = None
    if category.lower() == "stories":
        stories = Category.published.filter(slug__in=['stories'])
        if stories:
            stories = stories[0].entries_published()
        return_dict["stories"] = stories
    return return_dict
