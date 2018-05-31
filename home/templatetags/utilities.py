from django import template
from django.conf import settings
from django.utils import timezone
from zinnia.models import Entry
from _calendar import Calendar

from datetime import date
register = template.Library()



@register.filter(name='clean')
def clean_word(word):
    word = ''.join(ch for ch in word if ch.isalnum())
    return word.replace(" ", "").strip().lower()