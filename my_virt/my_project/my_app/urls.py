# from django.urls import path
# from .views import ScoreListView

# urlpatterns = [
#     path('scores/', ScoreListView.as_view(), name='score_list'),
# ]


from django.urls import path
from .import views

urlpatterns=[
    path('', views.index, name='index')
]