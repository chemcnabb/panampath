# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import subprocess
from django.conf import settings
# Create your models here.







# method for updating
@receiver(post_save)
def touch_tmp(sender, instance, **kwargs):
     # print settings.BASE_DIR + "/tmp/restart.txt"
     subprocess.call(["touch", settings.BASE_DIR + "/tmp/restart.txt"])