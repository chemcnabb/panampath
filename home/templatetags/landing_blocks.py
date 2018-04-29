from django import template
from zinnia.models import Category
register = template.Library()


@register.inclusion_tag('tags/home_block.html', takes_context=True)
def home_block(context, category, class_style=""):
    """
    Return the featured entries.
    """
    events = None
    if category.lower() == "events":
        events = Category.published.filter(title__in=['Events'])
        events = events[0].entries_published()
    return {'category': category, "class_style": class_style, "events":events}
