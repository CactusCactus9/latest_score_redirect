# from django.db import models
# # from API.models import User

# class Game(models.Model):
#     #linking User to the game
#     # on_delete=models.CASCADE: If a user is deleted, their associated game records are also deleted.
#     # null=True: Allows the field to be empty in the database.
# # blank=True: Allows the field to be optional in forms.

#     player_one = models.models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_as_player_one")#ForeignKey is like apointer to another model : connects a model (table) to another model (table).
#     player_two = models.models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_as_player_two")#ForeignKey is like apointer to another model : connects a model (table) to another model (table).
#     score_one = models.IntegerField()
#     score_two = models.IntegerField()
#     winner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games_won")
#     date = models.DateTimeField(auto_now_add=True)  # Automatically adds the date when the score is saved

#     def __str__(self):
#         return f"Game between {self.player_one.username} and {self.player_two.username} on {self.date}"

# A serializer: converts Python objects (like your Score model) into JSON, which can be sent to the frontend.
# A view: handles HTTP requests

# django :  kitchen
# react : waiter
# api : menu : only thing the waiter (React) uses to communicate with the kitchen