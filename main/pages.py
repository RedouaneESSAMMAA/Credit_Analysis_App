from flask import Blueprint, render_template, jsonify
import math 
import numpy as np
from data.data import global_data

bp = Blueprint("pages", __name__, url_prefix="/")

@bp.route('/')
def home():
    return render_template("pages/home.html", global_data=global_data, segment="/")

@bp.route('/chart_data')
def chart_data():
    return jsonify(global_data['chart_data'])

@bp.route("/profiles")
def profiles():
    return render_template("pages/profiles.html", global_data=global_data, segment = '/')