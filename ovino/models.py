from django.db import models
from tag.models import Tag

# Create your models here.
class Ovino(models.Model):
    
    identificador = models.CharField(max_length=16, unique=True)
    peso = models.FloatField()
    nascimento = models.DateTimeField()
    raca = models.CharField(max_length=20, null=True)
    cor = models.CharField(max_length=20,blank=True, null=True)
    genero = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    tag = models.OneToOneField(Tag, on_delete=models.SET_NULL, null=True)

    #class Meta:
    #    db_table = 'Ovino'
    #    verbose_name = 'Ovino'
    #    verbose_name_plural = 'Ovinos'

    def __str__(self):
        return self.identificador

    #def __unicode__(self):
    #    return self.identificador