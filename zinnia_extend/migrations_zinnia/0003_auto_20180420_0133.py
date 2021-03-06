# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-04-20 01:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('zinnia', '0002_auto_20180323_0014'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='entry',
            options={'get_latest_by': 'publication_date', 'ordering': ['publication_date'], 'permissions': (('can_view_all', 'Can view all entries'), ('can_change_status', 'Can change status'), ('can_change_author', 'Can change author(s)')), 'verbose_name': 'entry', 'verbose_name_plural': 'entries'},
        ),
    ]
