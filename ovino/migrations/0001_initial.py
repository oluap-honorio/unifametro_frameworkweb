# Generated by Django 5.0.1 on 2024-01-27 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ovino',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identificador', models.CharField(max_length=16, unique=True)),
                ('peso', models.FloatField()),
                ('nascimento', models.DateTimeField()),
                ('raca', models.CharField(max_length=20, null=True)),
                ('cor', models.CharField(blank=True, max_length=20, null=True)),
                ('genero', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
