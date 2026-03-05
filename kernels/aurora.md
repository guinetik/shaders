 PDF To Markdown Converter

    Debug View
    Result View

Simulating the Aurora Borealis
Gladimir V. G. Baranoski
Department of Computer Science
University of Utah
Jon G. Rokne
Department of Computer Science
University of Calgary
Peter Shirley
Department of Computer Science
University of Utah
Trond Trondsen
Institute for Space Research
University of Calgary
Rui Bastos
Department of Computer Science
University of North Carolina
Abstract

We present an algorithm to simulate the aurora borealis,
commonly known as the “northern lights”, a natural phe-
nomenon of great visual beauty and considerable scientific
interest. The algorithm is based on the current understand-
ing of the physical origin of the aurora. This natural display
is mainly caused by high-energy electrons originating in the
Sun and entering the Earth’s atmosphere in narrow regions
centered on the magnetic poles. These electrons collide with
atmospheric atoms which are excited to higher energy lev-
els. The excited atoms emit rapidly varying visible light in
a curtain-like volume as they return to lower energy lev-
els thereby creating the aurora. By simulating these light
emissions along with the spatial and temporal distribution
of the entering electrons, we are able to render the major vi-
sual aspects of auroral displays. This approach also allows
the representation of time-dependent features that charac-
terize the dynamic nature of the aurorae. The applicabil-
ity of this auroral model for artistic and research purposes
is illustrated through comparisons of synthetic images with
photographs of real auroral displays.
1 Introduction

The Earth is constantly bombarded by energy from outer
space. Sunlight is the most visible and common example.
Other parts of this bombardment are invisible, such as cos-
mic rays, x-rays and atomic particles that stream out from
the Sun in all directions. These atomic particles, protons
and electrons, constitute thesolar wind. A small fraction
of these solar wind particles interact with the Earth’s mag-

Figure 1. Photograph of a real auroral display
(courtesy of Jan Curtis). Two auroral curtains
produced by two sheets of precipitating elec-
trons causing emissions primarily at a wave-

length of 557 : 7 nm.

netic field and are guided and accelerated to regions around
the magnetic north and south poles. These fast energetic
particles then collide with high altitude atmospheric atoms
and molecules resulting in light emission. This natural phe-
nomenon is known asaurora borealis, or “northern lights”
(Figure 1), andaurora australis(its less familiar southern
counterpart).
The aurora is considered by many to be one of the most
fascinating and mysterious nature’s displays. Lynch and

Livingston [23] appropriately observe:

Aurorae stand alone for mouth-gaping, awe-
inspiring, spell-binding majesty. Their silent play
of eerie color is surely one of the Mother Nature’s
grandest spectacles.

The impressive visual characteristics of auroral displays
have fascinated writers, philosophers, poets and scientists
over the centuries. Although descriptions and investigations
are more prevalent in northern cultures, which live along
the region known as the “auroral oval”, we can also find
descriptions in the Bible and in the ancient texts of Greek,
Roman and Chinese writers and philosophers.
Mankind has been puzzled by the origin of this phe-
nomenon for centuries^1. The main visual aspects of the

aurora, involving the excitation of atmospheric particles in-
directly by the solar wind, have only been understood in
this century. Although several theories regarding the aurora
have been recently validated by space-born instrumentation
[4], many questions remain concerning auroral physics. As
an example, the mechanism of auroral electron acceleration
by natural forces constitutes one of the major mysteries con-
fronting space plasma physics today [5].
Because the aurorae are not often visible far from the
poles the reader might question whether an effort to simu-
late the aurora is worthwhile. We believe there are several
reasons such simulations should be done. For any educa-
tional or entertainment simulation of an environment typi-
cal of polar latitudes, the aurora is an obvious visual effect,
and in fact it is often bright enough to navigate by or even
to cast shadows. The aurora is also a strong visible effect
in space, and even occurs on other planets with strong mag-
netic fields such as Jupiter. Simulating the aurora may also
have great scientific value. As in any effort in the physical
sciences, models can be tested by how well their simula-
tions predict observed data. Since the aurorae have such an
obvious visual manifestation, reproducing their actual vi-
sual appearance is one way to evaluate auroral theories and
data. The science behind the aurora is furthermore quite
crucial because of its links to plasma^2 physics as stated by

Savage [29]:

Down here on Earth, plasmas occur only
in human-made devices such as neon lights,
mercury-vapor lamps and laboratory apparatus.
But elsewhere in the Universe, plasmas are com-
mon. As much as 99.9 per cent of the matter in the
cosmos is thought to exist in a plasma state. This

(^1) Some ancient civilizations believed the aurorae to be flyingdragons
[12].
(^2) The wordplasmais used here to denote a state of the matter in which
the atoms are competely dissociated into nuclei and electrons, which in the
case of the solar wind forms a ionized stream of charged particles of both
signs in equal numbers [12].
includes not only the matter in the Sun, the stars
and space, but also in the outer atmosphere, the
Earth’s magnetic field and the solar atmosphere-
all the regions that are involved in producing the
aurora. The polar lights offer us a glimpse into
the complex workings of the plasma universe and
provide us with a natural laboratory in which it
can be studied.
The primary goal of our research is to perform realistic sim-
ulations of auroral displays, incorporating as many known
auroral physics concepts and data as possible, while keep-
ing the complexity of the algorithm compatible with visual
requirements. Initially, we simulate the paths of the falling
electron beams to model the dynamic nature of the auro-
ral displays. The spectral and intensity characteristics of
these displays are modeled by considering the light emis-
sions along these paths. During the rendering the light emis-
sions are forward mapped to the image plane to account for
the view dependent characteristics of the aurorae. Finally,
the temporal variations associated with the spectral distri-
bution of the light emissions are taken into account by ap-
plying an antialiasing or “blurring” technique.
In short, the algorithm presented in this paper simu-
lates the stochastic processes associated with the auroral
emissions in order to represent the major visual and time-
dependent features of the auroral displays. It can be used
by both artists and researchers to produce auroral images.
Artists can use it to include auroral displays in the synthetic
reproduction of polar scenes or in simulations of the night
sky at different latitudes. Geophysical researchers may in-
vert the model to refine auroral spectral and intensity data
as well as to validate concepts regarding the composition of
the outer atmosphere.
In the remainder of the paper we first introduce the sci-
entific background for the auroral phenomena. We then
present our auroral modeling approach. Afterwards, we de-
scribe the rendering techniques used to generate the auroral
images. Finally, we compare the images produced using our
model with photographs of auroral displays, and outline di-
rections for future work in this area.
2 Auroral Science

Auroral physics involves several complex energy reac-
tion and transfer mechanisms. In this section we present
an overview of auroral phenomena, focusing on physical
aspects directly related to its morphology, spectrum and in-
tensity. The reader interested in a more detailed description
of auroral physics is referred to the various comprehensive
texts on this phenomenon [4, 5, 12, 20].

2.1 Light Emission

The particles responsible for the aurora are electrons and
protons that originate from solar flares and coronal mass
ejections and become the “solar wind” [6, 24]. The pro-
tons in the solar wind are not as efficient generators of au-
roral light, so they will not be discussed further. The solar
wind forms a shock front when it interacts with the Earth’s
magnetic field (Figure 2), and some of the particles form
a plasma sheet on the side of the Earth opposite to the
Sun (night side). In this region these particles are stored
and occasionally accelerated and forced towards the Earth
at great velocity. The details of this process are still un-
known. These particles then migrate along the magnetic
field lines of the Earth, and eventually “dive” toward oval
regions around the Earth’s magnetic poles.

shock frontEarth

individual auroral particle neutral
plasma sheet

Figure 2. The solar wind forms a shock
front when it hits the Earth’s magnetosphere.
Some electrons interact with a neutral plasma
sheet and travel back toward the Earth, even-
tually descending in the regions around its
magnetic poles.

The directed velocity of a precipitating electron can be
separated into two components parallel and perpendicular to
the magnetic field lines represented byB~. The parallel com-

ponent is unaffected by the magnetic field, and the electron,
therefore, moves alongB~with a speed equal to its parallel

velocity. The electron does not cross the magnetic field line.
Instead, it travels around on a circle at a speed equal to the
perpendicular component of its velocity. The combination
of both components leads to a spiraling motion for the elec-
tron with an overall macroscopic progression parallel to the
field lines (Figure 3) [3].
As the electrons travel down along the Earth’s magnetic
field lines they suffer many random deflections which are
caused by collisions with atoms of the atmosphere (Fig-
ure 3). These deflections spread the electrons out horizon-
tally. When the electrons interact with atoms of the atmo-
sphere, the atoms are excited and after a period of time they
may emit a photon. Statistically several collisions must oc-

second
collision

first
collision B

Figure 3. A single electron undergoes several
collisions on its travel toward Earth. Each
collision can potentially change the electron’s
energy and position.

cur before a photon is emitted. The wavelength of this pho-
ton, aspectral emission line, depends primarily on the type
of atmospheric constituent hit by the electron and the sta-
bility of the atom’s excited state. In practice the wavelength
will correlate with height (Figure 4). Almost all of the visi-

ble aurorae occur at altitudes between 100 kmand 300 km

above the Earth’s surface and thus appear to be part of the
distant night sky. Atomic oxygen and molecular and atomic
nitrogen are the principal constituents of the upper atmo-
sphere available for and involved in the production of auro-
ral emissions at these altitudes.

c
e

630.0 nm
427.8 nm 557.7 nm

c
e

e c

Figure 4. Collisions (c) between auroral elec-
trons and atoms or molecules in the upper
atmosphere may generate photon emissions
(e) at different wavelengths. The emission
of a red photon is preceded by a long delay

(around 110 s), while the photon emissions at

the other wavelengths are characterized by

short delays (less than 1 s).

Besides the spectral emission lines generated by colli-
sions between electrons and atoms, the auroral spectrum is
also composed ofspectral emission bandsgenerated by col-
lisions between electrons and molecules. The most com-
mon and the brightest visible feature of the aurorae, the
atomic oxygen “green line” at 557 : 7 nm, is dominant in
the lower parts of auroral displays, around 100 km. It is

mainly due to this emission line that most aurorae appear
yellow-green. Because the peak of human light sensitivity
is about 555 : 0 nm, these aurorae are particularly bright-

looking. The red in the upper parts is caused mainly by
another commonly observed line, the atomic oxygen “red
line” at 630 : 0 nm. The bluish color, seen sometimes on

the lower border of auroral displays, comes mainly from the
ionized nitrogen “blue band” at 427 : 8 nm. These emissions

may be considered to form a triad with a highly saturated
blue, yellowish-green, and red, which are almost the ideal
primaries for an RGB display system. The spectral variety
of auroral displays is further contributed to by weaker light
emissions at other wavelengths across the visible spectrum.
The mixtures in various ratios of all of these components
may result in a wide variety of hues and colors.
Even though green and red, which are the strongest lines
in the auroral spectrum, both originate from excited atomic
oxygen, they behave quite differently. The transition state
that produces the atomic oxygen green line only exists for
up to 0 : 7 s, and the excited atom cannot move far before its

photon is emitted. As a result the green line is often visible
in structured forms. The transition state that produces the
atomic oxygen red line can exist for 110 s, and the atom can

travel a longer distance from the point at which it was ex-
cited. As a result, the red emissions are spread over a wider
area. The ionized nitrogen blue band has a spatial distribu-
tion similar to the green line, since the transition state that
gives rise to this band can exist for less than 0 : 001 s[4]. The

longer the life of an excited atom, the greater the chance it
has of colliding with other atmospheric particles and los-
ing its capacity to emit light, a process known asquenching
[20]. This explains why the red oxygen line is weaker than
the green line at lower altitudes (higher atmosphere density)
within an auroral display, and why some auroral features are
red at high altitude and green lower down.
2.2 Auroral Shape

The basic shape of an aurora is determined by the energy
and density of the electrons entering the atmosphere, as well
as the local variations in the electric field of the Earth. The
Earth has “magnetic substorms” characterized by large vari-
ations in the magnetic field [21]. These substorms, which
can occur over a short period of time, are responsible for the
impressive temporal changes in aurora. More intense sub-
storms, and consequently more impressive auroral displays,

are more likely to occur when the Sun goes through periods
of high sunspot activity at approximately 11-years intervals,
the next being expected in 2000/2001 [4, 6].
The most basic aurora can be thought of as a “curtain”
of light emissions from “sheets” of falling electrons. This
curtain will be colored, brightly yellow-green at the bottom,
perhaps red at the top, and a yellow/orange transition may
also be present. It can bend and fold almost like a real cur-
tain thereby generating bright vertical streaks (Figure 5).
Such features occur at many scales in real aurora. In fact,
the thin sheets of precipitating electrons are often subject to
quasi-periodic, rotational distortions [16, 17]: spirals, curls

and folds. The spirals are large scale distortions ( 50 km
apart), the curls are small scale ( 2 10 kmapart) and
the folds are intermediate scale ( 20 kmapart). Folds and

curls are more common in auroral displays observed from
the ground [17] (Figure 6).

auroral curtain
(viewed from above) total thickness

to
viewer

a) b)

Figure 5. Because the emission is in all direc-
tions within an auroral curtain and the cur-
tain is no more opaque than the regular at-
mosphere, the apparent surface brightness
is proportional to the thickness of the curtain
as seen by the viewer. a) A cross section of a
curtain and b) a graph of apparent thickness.

a) b)

Figure 6. Cross-sections of an auroral curtain
as viewed from above illustrating two com-
mon rotational distortions: a) fold and b) curl.

In addition to different spatial scales, these distortions
have also different time scales. Folds can exist for more
than a second, while curls have a lifetime in the preferred

range of 0 : 25 0 : 75 s[30]. Both types of rotational dis-

tortions are responsible for distinct visual features present in

auroral displays. The light emanating from convoluted folds
in auroral arc curtains oftentimes creates the impression of
vertical, or near-vertical, “stripes” [5]. Despite their highly
transient nature, curls are largely responsible for another
important auroral feature, namely electron beams evolving
into thin field-aligned filaments or “rays”. An auroral ray
typically has a diameter of 1 kmor less and a vertical di-

mension up to several hundred kilometers.
2.3 Auroral Morphology

The auroral displays present a variety of forms when ob-
served from the ground. These forms have given rise to a
terminology discussed extensively in the International Au-
roral Atlas [14]. For our purposes we divide the auroral
forms into two groups: those with and those without a rayed
structure. Among the auroral forms without a ray structure
we may find:
arcs and bands: homogeneous structures that can ex-
tend over 1000 km, whose width (thickness) may vary
from several hundred meters to more than 10 km,
while their vertical dimension is around 20 30 km

(Figure 7a and 7c). Sometimes a band may be twisted
into horseshoe bends.

diffuse patches: these forms have a cloud-like appear-

ance and may cover several hundred square kilometers.
Because they are weak and lack definite structures they
can be difficult to see with the naked eye.

Among the auroral forms with a ray structure we may
find:
rayed arc: a homogeneous arc broken up into vertical

striations (Figure 7b).

rayed band: a band made up of numerous vertical stri-

ations (Figure 7d).

rays: ray-like structures, appearing singly or in bundles

separated from other forms.

corona: a rayed aurora seen near the magnetic zenith,

which due to a perspective effect, gives the appearance
of a crown with rays converging on one point (Fig-
ure 7e).

drapery: a band made up of long rays, giving the ap-

pearance of a curtain, which may be folded (Figure 7f).

Rayed bands and draperies are visually very similar. The
difference between these auroral forms is mostly associated
with the length of the rays, which are shorter in rayed bands,
and the overall distribution of bends, which tend to appear
more often in draperies.

a) b)

c) d)

e) f)

Figure 7. Artist’s conception of some typical
auroral forms: a) homogeneous arc, b) rayed
arc, c) homogeneous band, d) rayed band, e)
corona and f) drapery (courtesy of Adriane
Elena Baranoski).

Groups of arcs or bands frequently occur simultaneously
exhibiting similar geometrical behavior and forming an arc
or band system (Figure 1). The spacing between arcs and

bands in a system is typically 10 100 km[17]. Two or

more systems may be visible during some phase of a large
auroral display.

3 Aurora Modeling

Despite their inherent complexity most auroral displays
present a set of features that make them readily recognizable
by viewers: arcs and band shapes with and without rayed
structures, characteristic spectral variation, vertical distri-
bution of intensity dependent on the type of auroral display
and apparent surface brightness dependent on the direction
of observation. Our modeling approach focuses on the re-
alistic simulation of these characteristics. It applies meth-
ods that resemble particle systems techniques used to model
fuzzy objects [26] and splatting techniques used in volume
rendering applications [33].
In this section we describe how we simulate the underly-
ing physical processes affecting the auroral visual features
using the available data. The world coordinate system con-

sidered in our simulations as well as the elevation angle

used in auroral observation are sketched in Figure 8.

3.1 Auroral Shapes and Internal Structures

Our model of auroral shapes is based on the particle na-
ture of the aurorae. However, instead of following the tra-
jectories of individual electrons, we simulate the paths taken
by beams of electrons. These beams represent auroral rays,

y θ
z
x

Figure 8. Sketch showing the world coordi-
nate system considered in our simulations

and the elevation angle.

or curls (Section 2.2). This modeling approach is divided
into three parts: the determination of the starting points for
the beams, the simulation of their paths along the geomag-
netic field lines and the computation of the light emissions
along their paths.

3.1.1 Sheet Model

Studies of auroral physics [9, 16] show that the stream of
precipitating electrons that cause auroral displays can ac-
curately be represented by sheets with boundaries given by
sine waves. These waves have equal amplitudes, but they
are not in phase. The phase shift,, may be as high as
0 : 35 radians [16]. Each sheet can be formed by few a

internal layers, and its shape defined by two parameters:
the thickness,w, and the wavelength,(Figure 9a). The
thickness of an electron sheet may vary from about 1 10
km, and the ratio represented by=(2w)has a preferred
range of 5 : 2 31 : 4 [16]. By varying these parameters one

can simulate auroral disturbances that appear as a series of
asymmetric bulges in the sheet.

fold

df

λ
w

a)

b)

Figure 9. Top view of cross-sections of two
electron sheets with boundaries represented

by sine waves with a given phase shift: a)

without folds and b) with folds.

The boundaries as well as the internal layers of these
sheets are modeled using sine curves. Hence, the starting
points for the electron beams used in our simulations are ob-

tained through the discretization of these curves. The world

coordinates of the extremities of the electron sheets,Piand
Pf, the number of points in each sine wave,n, the num-
ber of internal layers,b, and the parametersPf,,wand

defined above are the input parameters used to define these
sheets.

Intuitively, a starting pointPcan be seen as a point of
a sine curve described parametrically bys 2 [0::1]and
r 2 [ir::fr](Figure 10). Due to the phase shift, each

sine curve representing a sheet layer starts with a different

initial angleir, and the difference between the initial an-

gles of the boundary layers corresponds to the overall phase

shift.
Computationally a starting pointP is obtained using

the equation below which takes into account the geometry
shown in Figure 10:

P(s;r)=u~a(s)+wsin(r)
u~b
ju~bj
(1)
whereu~acorresponds to the vector fromPitoPf,u~bcorre-
sponds to the vector resulting from the cross product ofu~a
and the geomagnetic field vectorB~(Section 2.1).
The angular displacement given byris computed in-
crementally such thatnewr =oldr +dr, where the incre-
mentdris given by:
dr=
D
n
2 

(2)
whereDcorresponds to the distance betweenPitoPf,
which corresponds toju~aj, and the constant 2 corresponds

the period of sine functions.

Pi Pf
ua(s)

P(s,Φr)
ub

B

Figure 10. Geometry for generating the para-
metric sine waves.

The parametric interval represented bysis obtained us-
ing a random displacementds,i.e.,snew=sold+(ds)
whereis a uniformly distributed random number in the
interval[0::1]. If > 0 : 5 , then we add tods, otherwise
we subtract fromds. The use of a random displacement as

opposed to a regular one is consistent with the stochastic
nature of the phenomena.
In our simulation strategy, folds are modeled by replac-
ing portions of the sine waves by B ́ezier curves. The num-
ber of starting points between folds is also an input pa-

rameter,np, which is randomly displaced, such that we
can have quasi-periodic intervals,df, between these folds

(Figure 9b). The starting points placed on the folds are
also random displaced, and by varying the control points
of the B ́ezier curves we can simulate folds in different rota-
tional stages. The quasi-random parametrization of the sine
waves and B ́ezier folds results in approximations for elec-
tron sheets (Figure 9), which are consistent with the current
auroral theories [9, 16].
3.2 Precipitation of Electron Beams

The electrons are randomly deflected after colliding with
the atoms of the atmosphere. These deflections play an im-
portant role in the dynamic and stochastic nature of the au-
roral display hence they are taken into account in our simu-
lations. We consider the deflection points as emission points
and they are used to determine the spectral and intensity
variations of the modeled auroral displays (Section 4).
The tracking of each electron beam starts with the com-
putation of the starting points described in the previous sec-
tion. The electron beam’s velocity vector,~v, is defined as

the overall direction of progression of the particle during its
spiraling descending motion (Figure 3). The angle between
the electron’s velocity vector and the geomagnetic field vec-
torB~is called the pitch angle, (Figure 11a). A “loss cone”

of pitch angles is bounded at an altitudehby an angle (^) D.
This angle is given by an adiabatic invariant^3 , which takes
into account the ratio between the strength ofB~athand at
an altitude of 100 km(the auroral lower border) [19].

Electrons with  (^) Dare in the loss cone and are pre-
cipitated (“lost”) into the atmosphere. The boundaries of
this loss cone are somewhat diffuse ( (^) D 2 3 ), since
the value of (^) Ddecreases with altitude [19]. The length of
the path is given by a parameterLwhich is associated with

the height chosen for the modeled auroral display.
Each path is simulated incrementally, through the verti-
cal displacementtsuch thattnew =told+(dt), where
is an uniformly distributed random number in the interval
[0::1]. The use of this random displacement is consistent

with the spatial inhomogeneity of auroral electrons [25].
The thresholddtis an input parameter which depends on

the initial energy of the electrons. For instance, on aver-
age an electron with 10 keV( 60000 km=s) can collide 300
times before being brought to a halt^4 at an altitude of about
100 kmabove the ground [4]. In this case, since we assume
thatt 2 [0::1], we could usedt= 3001.

The deflections are simulated using the following se-
quence of steps which is based on the diagram sketched in

(^3) D=arcsin
q
B
B 100 [8, 19].

(^4) These electrons are not destroyed, but in the course of theirpassage
through the atmosphere they eventually become indistinguishable from the
ambient electron population [25].
α
vp
β
Pold
Pnew’
Pnew
v
B
deflectionpoint startingpoint
a) b) c)
vt
y z
x
αD B
v
starting
point
Figure 11. Stages of the simulation of an elec-
tron beam path: a) precipitation, b) computa-
tion of deflection points and c) displacement
of the electron beam along the magnetic field
lines.
Figure 11b. An intermediate pointPnew
0

is computed us-
ing:

Pnew
0
=Pold+(Ldt)
B~
jB~j
(3)
A temporary precipitation vectorv~t=Pnew
0
Poldis then

computed. The perturbation of this vector using a polar an-

gle and an azimuthal angle provides the direction for the
precipitating vectorv~p. The new point is computed usingv~p
as a directional displacement such thatPnew=Pold+v~p.
The polar angle corresponds to a pitch angle adjusted

to follow the reduction of (^) Dwith altitude. This adjustment
is performed using:
= (^) D(t ) (4)
where is an input angular parameter usually on the order
of 0 : 015 radians [19].
The azimuthal angle is obtained randomly, i.e.,
= 2 , whereis an uniformly distributed random num-
ber in the interval[0::1]. This choice for also follows the

stochastic characteristics of the phase space distribution of
the auroral electrons [25]. The net result of this displace-
ments is the electron beam being spread out onto other field
lines (Figure 11c).
Because the electron precipitation is governed by statis-
tical processes, the actual penetration depths are not iden-
tical even for two electrons with identical initial condi-
tions [3, 21]. In our simulations we account for this aspect
through two kinds of perturbations on the electron beams.
The first consists of changing the interval for the paramet-

ric variablet, which becomes[0::(1: 0 &L)], where&

corresponds to an uniformly distributed random number in

the interval[0::1], andLcorresponds to an input parame-

ter representing a variation on the path length. The second

consists of perturbing thezcoordinate of the starting point

of a electron beam (Figure 11a). This perturbation is per-
formed by applying a 3D correlated noise function [32] and
also causes a variation in the beam path length. However,
in the second case the variation will be related to perturba-
tions performed in the path length of the neighbor beams
and it will be more noticeable in a plane perpendicular to
the auroral display.
3.3 Auroral Spectrum

Since the aurora is characterized by its storm-like behav-
ior, the variations of spectral ratios (Figure 12a) and intensi-
ties (Figure 12b) according to the auroral heights are given
in the literature as average values. According to Romick
and Belon [28], these vertical spectral and intensity pro-
files are a good approximation of the vertical emission pro-
file. For these reasons our simulation of the auroral spec-
trum consists of sampling the spectral curves presented in
Figure 12b, using the heights of the deflection points as the
sampling parameter.

Figure 12. a) Spectral emission curves (re-
drawn from [4]). b) Auroral intensity profiles
along various forms (redrawn from [31]).

As mentioned earlier, the spectral variety of auroral dis-
plays is further contributed to by several weaker light emis-
sions at other wavelengths across the visible spectrum. For
the purpose of simulating the aurora, however, a viable

approach is to focus on the bright emissions, which are

most obvious to the casual observer, emissions ( 630 : 0 nm,
557 : 7 nm, 427 : 8 nm). The spectral variety seen in the au-

rora can then be simulated by mixing the components of this
triad in various ratios. As the data for other wavelengths be-
come available they can be easily incorporated in our simu-
lations and accounted for during the rendering process (Sec-
tion 4).

3.4 Auroral Intensities

The light intensity from an aurora is proportional to the
deposition of energy into the atmosphere by the precipitat-
ing electrons. As a result, auroral height and the intensity
height distribution of each auroral form are related to the
average energy and the energy distribution of the particles.
Vegard and Krogness [31] performed a series of ground-
based measurements that showed not only characteristic dif-
ferences of the distribution of intensity of various auroral
forms, but also very different intensity distributions even
for the same auroral form (Figure 12b). In some of the au-
roral forms the intensity is concentrated into a band of only

10 20 kmvertical distance, and the lower border can be

quite sharp. The intensity of a discrete arc typically falls
to 10% within a few kilometers below the maximum, and
to 1% a kilometer or two below that [18]. The findings of
Vegard and Krogness have been recently corroborated by
rocket-based measurements [4, 21, 28]. These vertical vari-
ations of intensity of auroral forms are also accounted for
in our simulations by sampling the intensity curves shown
in Figure 12b, also using the height of the deflection points
as the sampling parameter. The incorporation of these in-
tensity values in the computation of the volume emissions
is described in the next section.
As mentioned in Section 2.2, the observed intensity of
a particular auroral display depends on the direction of ob-
servation (Figure 5). In this context the apparent surface
brightness is used to define the intensity of an aurora and

it is given in rayleighs (R) [27]. The faintest auroral lights
that can be detected with the naked eye are of the order of 1
kRin the green line. One rayleigh is equal to an integrated
emission rate of 106 photons per square centimeter per col-
umn per second^5. The auroral intensities are commonly

classified in terms of the International Brightness Coeffi-
cient (IBC), as as shown in Table 1 [4, 12].
In short, the apparent surface brightness of an aurora
is proportional to the integrated emission per unit volume
along the line of sight [21, 30]. A thin auroral layer cov-
ering a large part of the sky is therefore most intense when
viewed at low elevation angles (Figure 8) due to the high

(^5) In this context “column” refers to the unknown height of the column
above the apparent source, and it is included to show that this is a volume
emission [21].
IBC intensity comparable to kR

1 Milky Way 1
2 thin moonlit cirrus clouds 2
3 1/3 of the intensity of full moonlight 3

4 1/10 of the intensity of full moonlight^64

Table 1. Intensity classification of aurora in-
tensities.

density of emissions observed in the lower border of sev-
eral auroral forms (Figure 12b). This dependence on the
direction of observation of auroral displays is taking into
account through the use of a view dependent rendering ap-
proach (Section 4).
4 Rendering

The rendering of auroral displays is performed in three
stages. In the first stage the light emissions are mapped
to a screen plane and stored in a image raster array. Af-
terwards these values are converted to RGB values in the
second stage. In the last stage the image raster array is con-
volved to simulate auroral temporal and spatial variations.
4.1 Forward Mapping of Emissions

Each electron beam is tracked from its starting point un-
til it reaches the low border of the electron sheet. The de-
flection points along the path of an electron beam can be
regarded as emission points. The world coordinates of each
emission pointEare used to compute an emitted ray. The
direction of this ray corresponds to the vector~egiven by
QE, whereQcorresponds to the projection center of a

pinhole camera (Figure 13). This emitted ray represents a
stream of photons emitted atEin the direction given by~e.

In the next step we determine if this emitted ray inter-
sects the screen plane. If there is no intersection, we move
to the next deflection point in the path. Otherwise, we de-
termine the pixel on the screen that corresponds to the in-
tersection (Figure 13). The screen coordinates of this pixel
correspond to the indices used to access the correspond-
ing element of the image raster array. This array is used
to accumulate the weight of the emitted rays that hit a cer-
tain pixel. This weight has three components that corre-
spond to the RGB channels. These three components are
obtained from a look-up table, which is derived from spec-
tral emission curves presented in Figure 12a and accessed
using the height of the emission point given byEy. These

(^6) The rate of photons hitting a detector faceplate aimed at this type of
aurora and subtending a solid angle!is three times smaller than the rate

of photons hitting the same detector faceplate when it is aimed at the full
moon and subtending the same solid angle!.

Q (projection center)

BBBB

BBBB

BBBB

BBBB

screen

pixel intersected
by the emitted ray

e

E (emission point)

Figure 13. Geometry for the forward mapping
of auroral emissions to the screen, or image,
plane of a virtual camera.

weight components are also multiplied by an intensity fac-
tor which accounts the different vertical variations of inten-
sity of the auroral forms. Its value is obtained from look-up
table which is derived from intensity curves presented in
Figure 12b and also accessed using the height of the deflec-
tion point.
After performing the forward mapping of emissions for
all deflection points along a given path, the algorithm pro-
ceeds to tracking another electron beam. If there are no
more beams to be tracked then the weight components
stored in the image raster array are converted to RGB values
as described next.

4.2 Conversion to RGB Values

The conversion of the auroral spectral emissions at wave-

lengths of 630 : 0 nm, 557 : 7 nmand 427 : 8 nmto RGB val-

ues associated with SMPTE chromacity coordinates follows
two steps. In the first step CIE spectral tristimulus values for

the wavelengths of the auroral emissions,~x(),y~()and
~z()[10], are converted to RGB tristimulus values,r(),
g()andb(), using:
2
4
r()
g()
b()
3

(^5) =M
2
4
x~()
y~()
z~()
3

(^5) (5)
whereMcorresponds to a transformation matrix set accord-

ing to SMPTE chromacity values [22].
In the second step the RGB color is quantified by sam-

pling the spectral curvef()of the emitting source:
R=
Z
f()r()d (6)
G=
Z
f()g()d (7)
B=
Z
f()b()d (8)

In practice, these integrations are performed by summa-
tions in which the spectral energy distribution represented
byf()is discretized [15]. Since in our case we are con-

sidering auroral emissions in only three wavelengths, these
summations become:
R=
X^3
i=
f
0
i()ri() (9)
G=
X^3
i=
f
0
i()gi() (10)
B=
X^3
i=
f
0
i()bi() (11)
wheref
0
i()corresponds to the sum of weights stored in a

pixel for each wavelength considered.
This discretization results in a loss of accuracy for
light sources with a continuous spectral energy distribution.
However, since the three auroral spectral emissions consid-
ered in our simulations are dominant in the auroral spec-
trum, this loss of accuracy is likely to be small. Moreover,
as data for auroral emissions at other wavelengths become
available, they can be easily incorporated in this conversion
scheme.
4.3 Antialiasing

After being hit by an auroral electron, an atmospheric
excited atom may move away from the collision point be-
fore emitting a photon. Hence, the auroral emissions from
a given emission point may contribute to multiple pixels in-
stead of a single pixel as imposed in Section 4.1. Statis-
tically, the intensity contribution spreads radially around a
central direction of motion and follows a Gaussian distri-
bution of intensity along that dimension [2]. The different
lifetimes of transition states in auroral emission cause dis-
tinct spread areas around the principal direction of propaga-
tion of an electron—110s for the red line, 0.7s for the green
line, and 0.001s for the blue line (Section 2.1).
For simulating this distribution of the auroral emissions,
we use a Gaussian kernel (mask) to blur the image obtained
with strict forward mapping in Section 4.1. That is, we
spread the contribution at each pixel to a surrounding pixel
neighborhood, according to a normalized Gaussian distri-
bution [7]. The Gaussian kernels (masks) used in our ex-
periments are given by:
G(i;j)=
1
2 ^2
e
(i^2 +j^2 )
2 ^2 (12)
whereiandjare the indices of a Gaussian kernel whose
size in each dimension is in the range[1::m], andcorre-

sponds to the standard variation of the Gaussian kernel.

We apply different kernel supports to each color chan-
nel, for approximating the distinct transition states at dif-
ferent spectrum lines. The pixel values of the red channel
receive the widest spreading factor in image space, whereas
the blue channel receives the narrowest factor. For an im-
age with 218 by 383 pixels and a field-of-view of 35 de-
grees vertical, we determined the Gaussian standard devia-
tions and the kernel supports per color channel empirically.
For the red channel we used a standard deviation of 4.75 and
a kernel support of 21 by 21 pixels, whereas for the green
channel we used a standard deviation of 2.0 and a support
of 5 by 5 pixels. We also determined no blurring for the
blue channel empirically. Scaling of the image resolution
or of the field-of-view implies proportional scaling of the
kernel parameters. Mathematically, this blurring process is
the convolution of the image with a color-dependent Gaus-
sian low-pass filter [33].
In addition to the local motion that each individual ex-
cited atom undergoes, an aurora also exhibits global tem-
poral variations that affect the entire phenomenon visually.
These global temporal variations are usually captured in
photographs as blurred auroral displays, due to finite ex-
posure times. For simulating this global blurring effect, we
sample the temporal variations of an aurora along time, and
compute the accumulation of all these independent contri-
butions on a single final image. This corresponds to gen-
erating an image of an aurora for each sample in time, and
then computing the arithmetic average of all the generated
images. Mathematically, this corresponds to another con-
volution, but using a temporal low-pass box filter [7]. The
longer the sampled-window is in time, the blurrier the re-
sults, similarly to the effects captured in real photographs
with longer exposure times.

5 Results

For illustrating the applicability of our model, we sim-

ulated several auroral displays^7. To facilitate the com-

parison with real photographs of aurorae, we also added
a background—night sky—and a foreground— mainly
vegetation—with respect to the simulated aurora display
(Figure 14, see also color plates). The image synthesis pro-
cess starts by initializing the color buffer with a background
scene, then superimposing the auroral display, and finally
filtering out regions of the image that would be covered by
foreground objects.
The dynamic nature of the aurorae precludes a quan-
titative analysis of their visual simulations. The alterna-
tive available is to qualitatively analyze the simulations in
comparison with photographs of real aurorae. However,
whereas photographs of an aurora by necessity contain a

(^7) The auroral images presented in this paper are also available at
http://www.cpsc.ucalgary.ca/~gbaranos/resume.html#Sample

Figure 14.Simulation of two auroral curtains.

certain amount of blur (Figure 15a, see also color plates),
due to low light conditions and significant exposure times
[13], instantaneous simulated images contain more defined
structures (Figure 15b, see also color plates), which is closer
to a naked eye observation of the phenomenon.

a) b)

Figure 15. a) Photograph of two ray-filled cur-

tains (courtesy of Jan Curtis, 5 sof exposure

time). b) Simulation of auroral curtains show-
ing the rays structure.

The application of local antialiasing techniques (Sec-
tion 4.3) not only accounts for small temporal variations
of auroral emissions, but also contributes to making the
appearance of the synthetic images closer to photographs
of real auroral displays (Figure 16, see also color plates).
However, the local antialiasing is not enough to entirely
mimic the blur due to finite exposure times of the auroral

photographs. As shown in Figure 17, see also color plates),
this effect is better approximated with a more global antial-
ising technique (Section 4.3).

a) b)

Figure 16. a) Photograph of a broad auroral

curtain (courtesy of Jan Curtis, 8 sof expo-

sure time). b) Simulation of a broad curtain
with local blurring.

a) b)

Figure 17. Simulation of finite exposure time
using the average of a) 2 and b) 16 images
uniformly sampled in time.

Besides visually comparing our synthetic images with
static photographs of real aurorae, we requested feedback
from several experts in polar science at various univer-
sities. The most detailed feedback came from Jan Cur-
tis, a climatologist at the Alaska Climate Research Cen-
ter, who has often experienced and photographed auro-
rae (http://climate.gi.alaska.edu/Curtis/aurora/aurora.html).
When shown our synthetic images, he indicated that the

shape is accurately represented and that there is a reduced
gradation from the brightest light to the faintest pale in our
images which can be observed in real aurorae [11]. This
observation indicates that undersampling followed by blur-
ring in our simulations has not made our images unrealis-
tic. Indirectly, this observation also addressed the lower dy-
namic range in synthetic images representation and display
(24 bits split into three color channels) than in photographic
film and the human eye.
For illustrating the viability of our auroral modeling ap-
proach in representing time-dependent features of auroral
displays, we produced a few animation sequences. We sim-
ulated movements often noticed in auroral displays: drift of
arcs and horizontal motion of curls. The simulation of the
drift of arcs was performed by changing the coordinates of
the ending points of an electron sheet, according to a spec-
ified time interval determined by a given drift velocity. For
simulating the horizontal swift motion of curls along arcs,
we varied the number of electron beams along each electron
sheet and shifted the position of the folds.

Figure 18 (see also color plates) shows frames of an

animation sequence in which arc drifting ( 2 : 5 km=s) and

a horizontal motion (left to right) of curls along the arc
( 8 : 5 km=s) are illustrated. For an observer the curls or au-

roral rays “travelling” back and forth between two extreme
points in the horizon in few seconds gives the visual impres-
sion of “dancing lights”.

a) b)

Figure 18. Frames a) frame #142 and b) frame
#320 of an animation showing an arc drift and
a horizontal motion of rays (from left to right).

The simulations presented in this paper were imple-
mented on a Compaq Alpha cluster of 30 machines, consist-
ing of 500 MhzAlpha EV56 processors [1]. The approx-

imate time taken to generate each image using 8 processors
in parallel was 22 s.
6 Conclusion and Future Work

We presented an algorithm for simulating auroral dis-
plays, which allows the generation of realistic images of this
fascinating natural phenomenon. The major auroral visual
and time-dependent features apparent to naked eye can be
promptly identified on our images. The results presented in
the previous section demonstrate that our algorithm qual-
itatively represents real auroral displays shown in photo-
graphic images commonly published in the literature.
As future work, we intend to extend our auroral mod-
eling approach to the simulation of large auroral rotational
distortions, commonly known asspirals. Small-scale tem-
poral variations associated with the formation of curls and
folds can also be incorporated to the current model as data
to support this research becomes available. We also believe
that the rendering of auroral displays can be done in real
time. We are currently working on techniques for real time
rendering of aurorae by exploiting graphics hardware.
Finally, the complexity and large variety of shapes, col-
ors and movements of the aurora and its direct connec-
tion with plasma physics present several avenues for future
research, with artistic, educational, and scientific applica-
tions. However, as suggested by Eather [12], perhaps the
main justification for continued study of the aurora, is the
aurora itself, with its beauty and mystery.

Acknowledgements

The authors would like to thank Dr. Jan Curtis and Dr.
Ove Harang for their valuable feedback, and the anonymous
reviewers for their useful insights. The authors would also
like to thank the Netera Alliance (Canada) for granting us
access to the MACI cluster, specially Dr. Rob Simmonds
and Mr. Robert Fridman for providing software and hard-
ware support during the parallel implementation of the algo-
rithm described in this paper. This research was supported
by NSERC (Canada) grants 69-1266 and PDF-207026.

References

[1] BARANOSK I, G.,ANDROK NE, J. G. Using a HPC
system for the simulation of the trajectories of solar
wind particles in the ionosphere. InHigh Performance
Computing Systems and Applications(Norwell, Mas-
sachusetts, 2000), N. Dimopoulos, Ed., Kluwer Aca-
demic Publishers. To appear.

[2] BOROVSK Y, J.,ANDSUSZCYNSK Y, D. Optical mea-
surements of the fine structure of auroral arcs. In
Auroral Plasma Dynamics(Washington, D.C., 1993),
R. Lysak, Ed., American Geophysical Union, pp. 25–

    vol. 80 of Geophys. Monogr. Series.

[3] BOROVSK Y, J., SUSZCYNSK Y, D., BUCHWALD, M.,

ANDDEHAVEN, H. Measuring the thickness of auro-
ral curtains.Arctic 44, 3 (1991), 231–238.

[4] BREK K E, A., AND EGELAND, A. The Northern
Lights, Their Heritage and Science. Gr ̈ondahl og
Dreyers Forlag, AS, Oslo, 1994.

[5] BRYANT, D. A.Electron Acceleration in the Aurora
and Beyond. Institute of Physics Publishing, Bristol,
UK, 1999.

[6] BURTNYK, K. Anatomy of an aurora. Sky & Tele-
scope 99, 3 (March 2000), 35–40.

[7] CASTLEMAN, K.Digital Image Processing. Prentice-
Hall, New York, 1996.

[8] CHAMBERLAIN, J. Physics of the Aurora and Air-
glow. Academic Press, New York, 1961.

[9] CHMYREV, V., MARCHENKO, V., POK HOTELOV,
O., SHUK LA, P., STENFLO, L.,ANDSTRELTSOV,
A. The development of discrete active auroral forms.
IEEE Transactions on Plasma Science 20, 6 (Decem-
ber 1992), 764–769.

[10] CIE. Colorimetry Official Recommendations of the
International Commission on Illumination. Commis-
sion Internationale de L’Eclairage (CIE), 1970.

[11] CURTIS, J. On the aurora simulation. Personal com-
munication, 2000. Geophysical Institute, University
of Alaska Fairbanks.

[12] EATHER, R.Majestic Lights. American Geophysical
Union, Washington, 1980.

[13] EATHER, R. An aurora watcher’s guide.Sky & Tele-
scope 99, 3 (March 2000), 42–48.

[14] EDINBURGHUNIVERSITYPRESS.International Au-
roral Atlas, 1963.

[15] HALL, R. Comparing spectral color computation
methods. IEEE Computer Graphics & Applications
(July/August 1999), 36–45.

[16] HALLINAN, T. Auroral spirals.Journal of Geophysi-
cal Research 81, 22 (August 1976), 3959–3965.

[17] HALLINAN, T.,ANDDAVIS, T. Small-scale auroral
distortions.Planetary Space Science 18(1970), 1735–

[18] HARGREAVES, J.The Solar-terrestrial Environment.
Cambridge University Press, Cambridge, 1992.

[19] HAYMES, R. Introduction to Space Science. John
Wiley & Sons, Inc., New York, 1971.
[20] JONES, A.Aurora. D. Reidel Publishing Company,
Dordrecht, Holland, 1974.
[21] KIVELSON, M.,ANDRUSSELL, C. Introduction to
Space Physics. Cambridge University Press, Cam-
bridge, 1995.
[22] LILLEY, C., LIN, F., HEWITT, W.,ANDHOWARD,
T. Colour in Computer Graphics. ITTI Computer
graphics and Visualisation, Manchester Computing
Centre, The University of Manchester, Manchester,
England, December 1993.
[23] LYNCH, D.,ANDLIVINGSTON, W.Color and Light
in Nature. Cambridge University Press, Cambridge,
1995.
[24] ODENWALD, S. Solar storms: The silent menace.Sky
& Telescope 99, 3 (March 2000), 41–56.
[25] REES, M. Physics and Chemistry of the Upper At-
mosphere. Cambridge University Press, Cambridge,
1989.
[26] REEVES, W. Particle systems - a technique for mod-
eling a class of fuzzy objects.Computer Graphics 17,
3 (July 1983), 359–376.
[27] ROACH, D. H. F.,ANDCHAMBERLAIN, J. A photo-
metric unit for airglow and aurora. Journal of Atmo-
spheric and Terrestrial Physics 8(1956), 345–346.
[28] ROMICK, G.,ANDBELON, A. The spatial varia-
tion of auroral luminosity - I, determination of vol-
ume emission rate profiles. Planetary Space Science
15 (1967), 1695–1716.
[29] SAVAGE, C.Aurora, The Mysterious Northern Lights.
Sierra Club Books, San Francisco, 1994.
[30] TRONDSEN, T.High Spatial and Temporal Resolution
Auroral Imaging. PhD thesis, Department of Physics,
Faculty of Science, University of Tromsø, Norway,
November 1998.
[31] VEGARD, L.,ANDKROGNESS, Q. The variation of
light intensity along auroral ray-streamers.Geofysiske
Publikationer 1, 1 (1920), 149–170.
[32] WATT, A.,ANDWATT, M.Advanced Animation and
Rendering Techniques. Addison-Wesley, New York,
1992.
[33] WESTOVER, L.Splatting: A Parallel, Feed-Forward
Volume Rendering Algorithm. PhD thesis, Department
of Computer Science, University of North Carolina at
Chapel Hill, November 1991.

This is a offline tool, your data stays locally and is not send to any server!

Feedback & Bug Reports
