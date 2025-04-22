# local_translator.py

from ctranslate2 import Translator
from transformers import AutoTokenizer

MODEL_PATH = "m2m100-ct2"

translator = Translator(MODEL_PATH, device="cpu")
tokenizer = AutoTokenizer.from_pretrained("facebook/m2m100_418M")

def translate(text: str, source_lang: str = "pl", target_lang: str = "en") -> str:
    tokenizer.src_lang = source_lang
    tokens = tokenizer.convert_ids_to_tokens(tokenizer.encode(text, return_tensors="pt")[0])
    results = translator.translate_batch([tokens], target_prefix=[[f"▁{target_lang}"]])

    output_tokens = results[0].hypotheses[0]
    output_text = tokenizer.decode(tokenizer.convert_tokens_to_ids(output_tokens), skip_special_tokens=True)
    return output_text