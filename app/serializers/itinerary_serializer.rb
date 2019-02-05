class ItinerarySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id
  has_many :itinerary_places
  has_many :places, :through => :itinerary_places, serializer: PlaceSerializer
  has_many :likes
  belongs_to :user
end
