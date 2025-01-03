# Generated by Django 5.1.4 on 2024-12-20 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('team1', models.CharField(max_length=50)),
                ('team2', models.CharField(max_length=50)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('venue', models.CharField(max_length=100)),
                ('available_seats', models.IntegerField()),
                ('team1_logo', models.ImageField(blank=True, null=True, upload_to='logos/')),
                ('team2_logo', models.ImageField(blank=True, null=True, upload_to='logos/')),
            ],
        ),
    ]
