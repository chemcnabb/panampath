from djgeojson.fields import PolygonField, MultiPointField, MultiLineStringField
from django.db import models


class PathSegment(models.Model):

    title = models.CharField(max_length=256)
    description = models.TextField(blank=True, null=True)
    picture = models.ImageField(blank=True, null=True)
    geom = MultiLineStringField(blank=True, null=True)

    def __unicode__(self):
        return self.title

    @property
    def picture_url(self):
        return self.picture.url
