# Generated by Django 3.1.6 on 2021-02-16 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0011_auto_20201222_2112'),
    ]

    operations = [
        migrations.AddField(
            model_name='search',
            name='version_type',
            field=models.CharField(choices=[('latest', 'latest'), ('all', 'all')], default='latest', max_length=255),
        ),
    ]
