from oic.oic import Client as OicClient
from oic.utils.authn.client import CLIENT_AUTHN_METHOD

client = OicClient
client = OicClient(client_authn_method=CLIENT_AUTHN_METHOD)
uid = "https://storage.inrupt.com/e3961a65-40f8-4a79-905e-f77e140abd4e/TESTING/"
issuer = client.discover(uid)
