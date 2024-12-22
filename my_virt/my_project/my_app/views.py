# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .models import Score
# from .serializers import ScoreSerializer



# # Django views are Python functions that take http requests and return http response, like HTML documents.
# class ScoreListView(APIView):
#     def get(self, request):
#         scores = Score.objects.order_by('-score')[:10]  # Get top 10 scores  ////list of Score obj = queryset
#         serializer = ScoreSerializer(scores, many=True)  # Serialize the sCORE OBJ into JSON
#         return Response(serializer.data)


# Models handle the database logic (Score.objects.order_by).
# Serializers handle the conversion to JSON (ScoreSerializer).
# Views handle the HTTP request-response flow (ScoreListView).


from django.shortcuts import render
# A view handles HTTP requests
# Create your views here.
from django.shortcuts import render

def index(request):
    return render(request, 'my_app/front.html')