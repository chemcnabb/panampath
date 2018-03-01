# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView


# Create your views here.
class IndexView(TemplateView):
    template_name = 'main.html'




    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)



        return context