from django import template
from zinnia.models import Category
register = template.Library()
from panampath.models import PathSegment

@register.inclusion_tag('tags/home_block.html', takes_context=True)
def home_block(context, category, class_style=""):
    """
    Return the featured entries.
    """
    return_dict = {'category': category, "class_style": class_style}
    segments = PathSegment.objects.all()
    coords = []
    for segment in segments:
        for member in segment.geom['coordinates']:
            for item in member:
                coords.append(item[::-1])
    # pprint(coords)
    return_dict["coordinates"] = coords
    events = None
    if category.lower() == "events":
        events = Category.published.filter(slug__in=['events'])
        if events:
            events = events[0].entries_published()
        return_dict["events"] = events
    news = None
    if category.lower() == "news":
        news = Category.published.filter(slug__in=['news'])
        if news:
            news = news[0].entries_published()
        return_dict["news"] = news
    return return_dict
