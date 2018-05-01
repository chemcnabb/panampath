# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from panampath.models import PathSegment
from pprint import pprint
# Create your views here.
class IndexView(TemplateView):
    template_name = 'main.html'




    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        segments = PathSegment.objects.all()
        coords = []
        for segment in segments:
            if segment.geom:
                coords.append(segment.geom['coordinates'])
            # for member in segment.geom['coordinates']:
            #     for item in member:
            #         coords.append(item[::-1])
  
        context["segments"] = segments
        context["coordinates"] = coords


        return context