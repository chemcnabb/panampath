from django import template
from django.conf import settings
from django.utils import timezone
from zinnia.models import Entry
from _calendar import Calendar

from datetime import date
register = template.Library()



@register.inclusion_tag('zinnia/tags/event_widget_list.html', takes_context=True)
def get_event_entries(context, number=5):
    print "getting calendar entries"
    """
    Return the featured entries.
    """
    entries = Entry.published.all()
    entries = [entry for entry in entries if entry.categories.slug == "events"]
    return {'events':entries[:number]}



@register.inclusion_tag('zinnia/tags/dummy.html', takes_context=True)
def get_calendar_entries(context, year=None, month=None,
                         template='zinnia/tags/entries_calendar.html'):
    print "getting calendar entries"
    """
    Return an HTML calendar of entries.
    """
    if not (year and month):
        day_week_month = (context.get('day') or
                          context.get('week') or
                          context.get('month'))
        publication_date = getattr(context.get('object'),
                                   'publication_date', None)
        if day_week_month:
            current_month = day_week_month
        elif publication_date:
            if settings.USE_TZ:
                publication_date = timezone.localtime(publication_date)
            current_month = publication_date.date()
        else:
            today = timezone.now()
            if settings.USE_TZ:
                today = timezone.localtime(today)
            current_month = today.date()
        current_month = current_month.replace(day=1)
    else:
        current_month = date(year, month, 1)

    dates = list(map(
        lambda x: settings.USE_TZ and timezone.localtime(x).date() or x.date(),
        Entry.published.datetimes('publication_date', 'month').filter(categories__title__contains="Events")))

    if current_month not in dates:
        dates.append(current_month)
        dates.sort()
    index = dates.index(current_month)

    previous_month = index > 0 and dates[index - 1] or None
    next_month = index != len(dates) - 1 and dates[index + 1] or None
    calendar = Calendar()

    return {'template': template,
            'next_month': next_month,
            'previous_month': previous_month,
            'calendar': calendar.formatmonth(
                current_month.year,
                current_month.month,
                previous_month=previous_month,
                next_month=next_month)}