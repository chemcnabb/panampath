# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from panampath.models import PathSegment
from pprint import pprint
import json
# Create your views here.
class MapView(TemplateView):
    template_name = 'map.html'

    def get_context_data(self, **kwargs):
        context = super(MapView, self).get_context_data(**kwargs)
        segments = PathSegment.objects.all()


        coords = []
        segment_popups = []
        segment_dict = {}
        for segment in segments:
            try:
                if "coordinates" in segment.geom:
                    count = 0
                    for member in segment.geom['coordinates']:
                        new_segment = []
                        for item in member:
                            new_segment.append(item[::-1])

                        segment_popups.append(segment.description)
                        lat = new_segment[(len(new_segment) - 1) / 2][0]
                        lon = new_segment[(len(new_segment) - 1) / 2][1]
                        if count == 0:
                            context["initial_marker"] = [lat, lon]

                        word = ''.join(ch for ch in segment.title if ch.isalnum())
                        segment_dict[word.replace(" ", "").strip().lower()] = {'lat':lat, 'lon':lon,'zoom':11}
                        coords.append(new_segment)
                        count += 1
            except TypeError:
                # No geometry added to map
                pass
        # pprint(coords)
        context["segments"] = segments
        context["coordinates"] = coords
        context["popups"] = segment_popups
        context["markers"] = json.dumps(segment_dict)
        print coords
        return context