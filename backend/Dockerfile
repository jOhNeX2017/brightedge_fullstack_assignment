FROM python:3.10.7
COPY requirements.txt /requirements.txt
RUN pip install -r requirements.txt

ADD  ./api/ /api
EXPOSE 8080
WORKDIR /api/

CMD ["uvicorn", "Runner:app", "--host=0.0.0.0", "--port=8080"]
