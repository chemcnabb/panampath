from django.db import models
from zinnia.models_bases.entry import AbstractEntry

class Picture(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='gallery')

    def __unicode__(self):
        return self.title

class Gallery(models.Model):
    title = models.CharField(max_length=50)
    pictures = models.ManyToManyField(Picture)

    def __unicode__(self):
        return self.title

class EntryExtend(AbstractEntry):
    gallery = models.ForeignKey(Gallery, null=True, blank=True)

    def __str__(self):
        return 'EntryExtend %s' % self.title

    class Meta(AbstractEntry.Meta):
        abstract = True