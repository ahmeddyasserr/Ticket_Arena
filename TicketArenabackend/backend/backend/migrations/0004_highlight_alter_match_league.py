# Generated by Django 5.1.4 on 2024-12-20 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_match_economic_seats_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Highlight',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match_name', models.CharField(max_length=255)),
                ('video_url', models.URLField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='match',
            name='league',
            field=models.CharField(choices=[('spain_league', 'La Liga'), ('german_league', 'Bundesliga'), ('England_league', 'Premier League'), ('france_league', 'Ligue 1'), ('italy_league', 'Serie A'), ('champions_league', 'Champions League')], max_length=50),
        ),
    ]
