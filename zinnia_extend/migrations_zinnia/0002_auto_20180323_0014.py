# -*- coding: utf-8 -*-
# Generated by Django 1.11.11 on 2018-03-23 00:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('zinnia', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='gallery',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='zinnia_extend.Gallery'),
        ),
    ]
