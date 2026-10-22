from flask import Blueprint, render_template, jsonify
import math 
import numpy as np
from 03_data.data import data

bp = Blueprint("pages", __name__, url_prefix="/")

@bp.route('/')
def home():
    return render_template("pages/home.html", global_data=global_data, segment="/")