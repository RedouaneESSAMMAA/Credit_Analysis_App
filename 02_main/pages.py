from flask import Blueprint, render_template, jsonify
import math 
import numpy as np

bp = Blueprint("pages", __name__, url_prefix="/")