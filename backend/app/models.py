from app import db
from sqlalchemy.sql import func


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.Text, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    created = db.Column(db.DateTime(timezone=True), server_default=func.now())
    points = db.Column(db.Integer, nullable=False, default=0)
    items = db.relationship("Item", backref="user", lazy=True)

    def __repr__(self):
        return "<User %r>" % self.name


class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    saved_CO2_kg = db.Column(db.Float, nullable=False)
    recycle_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return "<Item %r>" % self.name
