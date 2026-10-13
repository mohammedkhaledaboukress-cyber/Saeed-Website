"""Build a self-contained preview folder that works when hosted as plain
files under any sub-path (no server, no root-relative URLs).

    STATIC_EXPORT=1 npx next build && python3 scripts/build-preview.py OUTDIR

OUTDIR gets index.html (Arabic), en.html (English) and the _next, img and
video folders. The HTML is emitted without <html>/<head>/<body> wrappers so
a host page can wrap it; a tiny boot script restores lang, dir and the html/body
classes (font variables) that those wrappers would have carried.
"""
import glob, os, re, shutil, sys

out = sys.argv[1]
# Some static hosts reserve names that start with "_", so Next's _next/
# folder is published as assets/.
ASSETS = "assets"
os.makedirs(out, exist_ok=True)
shutil.copytree("out/_next", os.path.join(out, ASSETS), dirs_exist_ok=True)
for d in ("img", "video"):
    shutil.copytree(f"out/{d}", os.path.join(out, d), dirs_exist_ok=True)


def relative(s: str) -> str:
    s = s.replace("/_next/", ASSETS + "/")
    for d in ("img", "video"):
        s = s.replace(f'"/{d}/', f'"{d}/').replace(f'\\"/{d}/', f'\\"{d}/')
    s = s.replace('href="/en"', 'href="en.html"').replace('href="/ar"', 'href="index.html"')
    s = s.replace('\\"href\\":\\"/en\\"', '\\"href\\":\\"en.html\\"')
    s = s.replace('\\"href\\":\\"/ar\\"', '\\"href\\":\\"index.html\\"')
    return s


for src, dst in (("out/ar.html", "index.html"), ("out/en.html", "en.html")):
    s = relative(open(src, encoding="utf-8").read())
    attrs = re.search(r"<html([^>]*)>", s).group(1)
    lang = re.search(r'lang="([^"]+)"', attrs).group(1)
    direction = re.search(r'dir="([^"]+)"', attrs).group(1)
    body_cls = re.search(r'<body[^>]*class="([^"]+)"', s).group(1)
    html_cls = re.search(r'class="([^"]+)"', attrs).group(1)
    head = re.search(r"<head>(.*?)</head>", s, re.S).group(1)
    body = re.search(r"<body[^>]*>(.*)</body>", s, re.S).group(1)
    head = re.sub(r"<title>.*?</title>", "", head, count=1)
    boot = (
        "<script>(function(){var h=document.documentElement;"
        f'h.lang="{lang}";h.dir="{direction}";h.className="{html_cls}";'
        f'function b(){{document.body&&document.body.setAttribute("class","{body_cls}")}}'
        'b();document.addEventListener("DOMContentLoaded",b)})();</script>'
    )
    page = "<title>Saeed Portfolio</title>" + head + boot + body
    if dst != "index.html":
        # secondary pages are served as-is by the host, so they carry their
        # own document skeleton
        page = (
            f'<!doctype html><html lang="{lang}" dir="{direction}"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            "<style>body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>"
            f"</head><body>{page}</body></html>"
        )
    with open(os.path.join(out, dst), "w", encoding="utf-8") as f:
        f.write(page)

for f in glob.glob(os.path.join(out, ASSETS, "static/chunks/**/*.js"), recursive=True):
    s = open(f, encoding="utf-8").read()
    t = s.replace('"/_next/"', f'"{ASSETS}/"').replace("\ufffd", "\\ufffd").replace('"/video/', '"video/').replace('"/img/', '"img/')
    if t != s:
        open(f, "w", encoding="utf-8").write(t)

for f in glob.glob(os.path.join(out, ASSETS, "static/css/*.css")):
    s = open(f, encoding="utf-8").read()
    open(f, "w", encoding="utf-8").write(s.replace("url(/_next/static/media/", "url(../media/"))

print("preview written to", out)
