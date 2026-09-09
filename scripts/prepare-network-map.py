"""Compile vendored US Atlas Albers boundaries into small, deterministic scene data."""
import json, math, pathlib
source=json.loads((pathlib.Path(__file__).parent/'data/us-atlas-states-albers-10m.json').read_text())
scale=source['transform']['scale']; translate=source['transform']['translate']
arcs=[]
for arc in source['arcs']:
 x=y=0; points=[]
 for dx,dy in arc:
  x+=dx;y+=dy;points.append([x*scale[0]+translate[0],y*scale[1]+translate[1]])
 arcs.append(points)
def ring(ids):
 points=[]
 for i in ids:
  a=arcs[i] if i>=0 else arcs[~i][::-1]
  points.extend(a[:-1])
 # Remove sub-pixel detail, retaining geographic silhouette.
 out=[]
 for p in points:
  if not out or math.dist(p,out[-1])>1.4:out.append(p)
 return out
states=[]
for g in source['objects']['states']['geometries']:
 if g['id'] in ['02','15','72']:continue
 polys=g['arcs'] if g['type']=='MultiPolygon' else [g['arcs']]
 rings=[ring(p[0]) for p in polys];rings=[p for p in rings if len(p)>4]
 states.append(dict(id=g['id'],name=g['properties']['name'],rings=rings))
la=next(s for s in states if s['id']=='22');pts=max(la['rings'],key=len)
xs=[p[0] for p in pts];ys=[p[1] for p in pts];cx=(min(xs)+max(xs))/2;cy=(min(ys)+max(ys))/2
print('LA bbox',min(xs),max(xs),min(ys),max(ys),'center',cx,cy)
for s in states:
 s['rings']=[[[round((x-cx)*.018,4),round((cy-y)*.018,4)] for x,y in r] for r in s['rings']]
out='// US Atlas 3 / US Census 2017, ISC; see docs/us-atlas-LICENSE.txt. Albers, Louisiana-centered.\n'
out+='export const networkStates = '+json.dumps(states,separators=(',',':'))+';\n'
pathlib.Path('src/lib/network-geography.ts').write_text(out)
