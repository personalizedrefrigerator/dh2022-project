
Mac/linux
```console
cd backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

Windows should be similar, but the path to `activate` will be different.

On Windows (gitbash):
```console
cd backend
python -m venv env
source env/Scripts/activate
pip install -r requirements.txt
```


## Why aren't we committing venvs?
https://stackoverflow.com/questions/42733542/how-to-use-the-same-python-virtualenv-on-both-windows-and-linux
