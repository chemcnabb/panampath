from django import template
from zinnia.models import Category
register = template.Library()
from panampath.models import PathSegment


@register.filter(name='get_value_at')
def get_value_at(_list, index):
    return _list[index]

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

        if "coordinates" in segment.geom:

            for member in segment.geom['coordinates']:
                new_segment = []
                for item in member:

                    new_segment.append(item[::-1])
                segment_popups.append("<br /><strong>{}</strong><br /> {}".format(segment.title, segment.description))
                coords.append(new_segment)
    # pprint(coords)
    return_dict["coordinates"] = coords
    return_dict["popups"] = segment_popups




    events = None
    if category.lower() == "events":
        events = Category.published.filter(slug__in=['events'])
        if events:
            events = events[0].entries_published()
        return_dict["events"] = events


    stories = None
    if category.lower() == "stories":
        stories = Category.published.filter(slug__in=['stories'])
        if stories:
            stories = stories[0].entries_published()
        return_dict["stories"] = stories
    return return_dict
