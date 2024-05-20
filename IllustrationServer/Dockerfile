FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . .
# COPY entrypoint.sh /usr/bin/entrypoint.sh

# ENTRYPOINT [ "entrypoint.sh" ]

CMD ["uvicorn", "src.main:app", "--host", "127.0.0.1", "--port", "8000"]

EXPOSE 8000