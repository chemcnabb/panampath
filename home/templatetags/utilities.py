from django import template
from django.conf import settings
from django.utils import timezone
from zinnia.models import Entry
from _calendar import Calendar

import datetime
from zinnia.models.category import Category
from django.db.models import Count

register = template.Library()



@register.filter(name='clean')
def clean_word(word):
    word = ''.join(ch for ch in word if ch.isalnum())
    return word.replace(" ", "").strip().lower()

@register.filter(name='dateToday')
def dateToday(date):
    #if date >= datetime.datetime.today():
    if date >= datetime.datetime.now():
        return date

@register.inclusion_tag('zinnia/tags/dummy.html', takes_context=True)
def get_categories_override(context, template='zinnia/tags/categories.html'):
    """
    Return the published categories.
    """

    # cats = Category.published.all().annotate(
    #             count_entries_published=Count('entries'))
    # MAP
    # WHAT'S
    # HAPPENING
    # PROJECTS
    # PARTNERSHIPS
    # IN
    # THE
    # NEWS
    # STORIES
    # ABOUT
    cats = Category.published.filter(slug="news").all() | Category.published.filter(slug="projects").all()

    print cats
    return {'template': template,
            'categories': cats,
            'context_category': context.get('category')}
