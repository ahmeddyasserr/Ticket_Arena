# Generated by Django 5.1.4 on 2024-12-20 03:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='match',
            old_name='venue',
            new_name='stadium',
        ),
        migrations.RemoveField(
            model_name='match',
            name='available_seats',
        ),
        migrations.AddField(
            model_name='match',
            name='economic_seats',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='match',
            name='regular_seats',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='match',
            name='vip_seats',
            field=models.IntegerField(default=0),
        ),
    ]
