const fs = require('fs');

const MUSIC_21_CATALOGUE = `1---||---269---||---Aus meines Herzens Grunde---||---30
2---||---347---||---Ich dank dir, lieber Herre---||---176
3---||---153.1---||---Ach Gott, vom Himmel sieh' darein---||---5
4---||---86.6---||---Es ist das Heil uns kommen her---||---86
5---||---267---||---An Wasserflüssen Babylon---||---23
6---||---281---||---Christus, der ist mein Leben---||---46
7---||---17.7---||---Nun lob', mein Seel, den Herren---||---271
8---||---40.8---||---Freuet euch, ihr Christen alle---||---105
9---||---248.12-2---||---Ermuntre dich, mein schwacher Geist---||---80
10---||---38.6---||---Aus tiefer Not schrei ich zu dir 1---||---31
11---||---41.6---||---Jesu, nun sei gepreiset---||---203
12---||---65.2---||---Puer natus in Bethlehem---||---302
13---||---33.6---||---Allein zu dir, Herr Jesu Christ---||---16
14---||---184.5---||---O Herre Gott, dein göttlich Wort---||---283
15---||---277---||---Christ lag in Todesbanden---||---38
16---||---311---||---Es woll uns Gott genädig sein 2---||---95
17---||---145.5---||---Erschienen ist der herrliche Tag---||---0
18---||---318---||---Menschenkind, merk eben---||---115
19---||---351---||---Ich hab' mein' Sach' Gott heimgestellt---||---182
20---||---302---||---Ein feste Burg ist unser Gott---||---74
21---||---153.5---||---Herzlich tut mich verlangen---||---160
22---||---180.7---||---Schmücke dich, o liebe Seele---||---0
23---||---28.6---||---Helft mir Gotts Güte preisen---||---124
24---||---415---||---Valet will ich dir geben---||---314
25---||---148.6---||---Wo soll ich fliehen hin---||---0
26---||---20.7---||---O Ewigkeit, du Donnerwort---||---276
26---||---20.11---||---O Ewigkeit, du Donnerwort---||---276
27---||---308---||---Es spricht der Unweisen Mund---||---92
28---||---36.8-2---||---Nun komm, der Heiden Heiland---||---264
29---||---32.6---||---Wie nach einer Wasserquelle---||---102
30---||---363---||---Jesus Christus, unser Heiland, der von uns den Gottes Zorn wandt---||---206
31---||---256---||---Wo Gott der Herr nicht bei uns hält---||---385
32---||---386---||---Nun danket alle Gott---||---257
33---||---330---||---Herr, ich habe mißgehandelt---||---137
34---||---305---||---Erbarm dich mein, o Herre Gott---||---78
35---||---248.53-5---||---Gott des Himmels und der Erden---||---114
36---||---385---||---Nun bitten wir den heiligen Geist---||---254
37---||---352---||---Wachet doch, erwacht, ihr Schläfer---||---185
38---||---115.6---||---Mache dich, mein Geist, bereit---||---0
39---||---259---||---Ach, was soll ich Sünder machen---||---10
40---||---255---||---Ach Gott und Herr, wie groß und schwer---||---3
41---||---65.7---||---Was mein Gott will, das g'scheh allzeit---||---346
42---||---67.7---||---Du Friedefürst, Herr Jesu Christ---||---68
43---||---8.6---||---Liebster Gott, wann werd ich sterben---||---227
44---||---377---||---Mach's mit mir, Gott, nach deiner Güt---||---237
45---||---108.6---||---Kommt her zu mir, spricht Gottes Söhn---||---224
46---||---248.9-1---||---Vom Himmel hoch, da komm ich her---||---0
47---||---416---||---Vater unser im Himmelreich---||---316
48---||---26.6---||---Ach wie nichtig, ach wie flüchtig---||---11
49---||---382---||---Mit Fried und Freud ich fahr dahin---||---249
50---||---244.37---||---O Welt, ich muß dich lassen---||---292
51---||---91.6---||---Gelobet seist du, Jesu Christ---||---109
52---||---429---||---Wenn mein Stündlein vorhanden ist 1---||---354
53---||---122.6---||---Das neugeborne Kindelein---||---57
54---||---151.5---||---Kommt her, ihr lieben Schwesterlein---||---235
55---||---110.7---||---Wir Christenleut---||---380
56---||---121.6---||---Christum wir sollen loben schon---||---42
57---||---404---||---O Traurigkeit, o Herzeleid---||---288
58---||---174.5---||---Herzlich lieb hab' ich dich, o Herr---||---153
59---||---245.3---||---Herzliebster Jesu, was hast du verbrochen---||---168
60---||---133.6---||---Ich freue mich in dir---||---181
61---||---159.5---||---Jesu Leiden, Pein und Tod---||---194
62---||---197.10---||---Wer nur den lieben Gott läßt walten---||---370
63---||---245.11---||---O Welt, ich muß dich lassen---||---293
64---||---194.6---||---Treuer Gott, ich muss dir klagen---||---0
65---||---144.3---||---Was Gott tut, das ist wohlgetan---||---338
66---||---280---||---Es woll uns Gott genädig sein 1---||---43
67---||---39.7---||---Wie nach einer Wasserquelle---||---104
68---||---431---||---Wenn wir in höchsten Nöten sein---||---358
69---||---226.2---||---Komm, heiliger Geist, Herre Gott---||---221
70---||---322---||---Gott sei gelobet und gebenedeiet---||---119
71---||---177.5---||---Ich ruf zu dir, Herr Jesu Christ---||---0
72---||---6.6---||---Erhalt uns, Herr, bei deinem Wort---||---79
73---||---334---||---Wenn mein Stündlein vorhanden ist 2---||---141
74---||---244.54---||---Herzlich tut mich verlangen---||---162
75---||---291---||---Das walt' mein Gott, Vater, Sohn und heiliger Geist---||---59
76---||---30.6---||---Wie nach einer Wasserquelle---||---103
77---||---248.46-5---||---In dich hab ich gehoffet, Herr 1---||---214
78---||---244.3---||---Herzliebster Jesu, was hast du verbrochen---||---166
79---||---342---||---Heut' triumphieret Gottes Sohn---||---171
80---||---244.44---||---Herzlich tut mich verlangen---||---159
81---||---245.15---||---Christus, der uns selig macht---||---49
82---||---46.6---||---O großer Gott von Macht---||---0
83---||---245.14---||---Jesu Kreuz, Leiden und Pein---||---192
84---||---197.5---||---Nun bitten wir den heiligen Geist---||---255
85---||---45.7---||---Die Wollust dieser Welt---||---278
86---||---36.4-2---||---Wie schön leuchtet der Morgenstern---||---377
87---||---56.5---||---Du geballtes Weltgebäude---||---72
88---||---28.6---||---Helft mir Gotts Güte preisen---||---124
89---||---244.62---||---O Haupt voll Blut und Wunden---||---0
90---||---57.8---||---Hast du denn, Liebster, dein Angesicht gänzlich verborgen---||---231
91---||---42.7---||---Gib unsern Fürsten und aller Obrigkeit (ending)---||---322
91---||---42.7---||---Verleih uns Frieden gnädiglich (beginning)---||---322
92---||---168.6---||---Wenn mein Stündlein vorhanden ist 2---||---143
93---||---194.12---||---Nun laßt uns Gott dem Herren---||---268
94---||---47.5---||---Warum betrübst du dich, mein Herz---||---333
95---||---55.5---||---Werde munter, mein Gemüte---||---362
96---||---87.7---||---Jesu, meine Freude---||---201
97---||---169.7---||---Nun bitten wir den heiligen Geist---||---256
98---||---244.15---||---O Haupt voll Blut und Wunden---||---0
99---||---16.6---||---Helft mir Gotts Güte preisen---||---125
100---||---18.5-w---||---Durch Adams Fall ist ganz verderbt---||---73
101---||---164.6---||---Herr Christ, der einge Gottes-Söhn---||---127
102---||---43.11---||---Ermuntre dich, mein schwacher Geist---||---81
103---||---13.6---||---O Welt, ich muß dich lassen---||---295
104---||---88.7---||---Wer nur den lieben Gott läßt walten---||---368
105---||---244.46---||---Herzliebster Jesu, was hast du verbrochen---||---167
106---||---245.28---||---Jesu Kreuz, Leiden und Pein---||---193
107---||---245.40---||---Herzlich lieb hab ich dich, o Herr---||---154
108---||---245.26---||---Valet will ich dir geben---||---315
109---||---187.7---||---Da Christus geboren war---||---308
110---||---102.7---||---Vater unser im Himmelreich---||---320
111---||---245.17---||---Herzliebster Jesu, was hast du verbrochen---||---169
112---||---84.5---||---Wer nur den lieben Gott läßt walten---||---373
113---||---245.37---||---Christus, der uns selig macht---||---50
114---||---419---||---Von Gott will ich nicht lassen---||---326
115---||---244.25---||---Was mein Gott will, das g'scheh allzeit---||---342
116---||---29.8---||---Nun lob', mein Seel, den Herren---||---272
117---||---244.10---||---O Welt, ich muß dich lassen---||---294
118---||---244.32---||---In dich hab ich gehoffet, Herr 1---||---213
119---||---176.6---||---Es woll uns Gott genädig sein 1---||---45
120---||---103.6---||---Was mein Gott will, das g'scheh allzeit---||---348
121---||---244.40---||---Werde munter, mein Gemüte---||---361
122---||---85.6---||---Ist Gott mein Schild und Helfersmann---||---216
123---||---183.5---||---Helft mir Gotts Güte preisen---||---126
124---||---268---||---Auf, auf, mein Herz, und du, mein ganzer Sinn---||---24
125---||---104.6---||---Allein Gott in der Höh sei Ehr---||---0
126---||---18.5-l---||---Durch Adams Fall ist ganz verderbt---||---0
127---||---298---||---Dies sind die heiligen zehn Gebot---||---66
128---||---263---||---Alles ist an Gottes Segen---||---19
129---||---369---||---Keinen hat Gott verlassen---||---217
130---||---324---||---Meine Seel erhebt den Herren---||---121
131---||---373---||---Liebster Jesu, wir sind hier---||---228
132---||---371---||---Kyrie, Gott Vater in Ewigkeit---||---225
133---||---437---||---Wir glauben all an einen Gott, Schöpfer Himmels und der Erden---||---382
134---||---301---||---Du geballtes Weltgebäude---||---71
135---||---317---||---Gott der Vater wohn uns bei---||---113
136---||---332---||---Herr Jesu Christ, dich zu uns wend---||---139
137---||---433---||---Wer Gott vertraut, hat wohl gebaut---||---366
138---||---64.8---||---Jesu, meine Freude---||---200
139---||---248.33-3---||---Warum sollt ich mich denn grämen---||---335
140---||---367---||---In allen meinen Taten---||---211
141---||---409---||---Seelenbräutigam---||---0
142---||---40.6---||---Schwing dich auf zu deinem Gott---||---305
143---||---368---||---In dulci jubilo---||---215
144---||---339---||---Aus tiefer Not schrei ich zu dir 2---||---151
145---||---420---||---Warum betrübst du dich, mein Herz---||---331
146---||---434---||---Wer nur den lieben Gott läßt walten---||---367
147---||---427---||---Wenn ich in Angst und Not mein' Augen heb empor---||---352
148---||---414---||---Danket dem Herrn, heuf und allzeit---||---313
149---||---384---||---Nicht so traurig, nicht so sehr---||---253
150---||---27.6---||---Welt, ade! ich bin dein müde---||---350
151---||---379---||---Jesus ist mein Aufenthalt---||---241
152---||---154.8---||---Meinen Jesum laß ich nicht, weil er sich für mich gegeben---||---244
153---||---262---||---Alle Menschen müssen sterben 1---||---17
154---||---293---||---Der du bist drei in Einigkeit---||---61
155---||---344---||---Hilf, Herr Jesu, laß gelingen 1---||---173
156---||---3.6---||---Herr Jesu Christ, meins Lebens Licht---||---8
157---||---438---||---Wo Gott zum Haus nicht gibt sein Gunst---||---389
158---||---294---||---Der Tag der ist so freudenreich---||---62
159---||---264---||---Als der gütige Gott vollenden wollt sein Wort---||---20
160---||---64.2---||---Gelobet seist du, Jesu Christ---||---108
161---||---366---||---Ihr Gestirn, ihr hohen Lüfte---||---210
162---||---288---||---Das alte Jahr vergangen ist---||---55
163---||---313---||---Für Freuden laßt uns springen---||---106
164---||---326---||---Ihr Knecht des Herren allzugleich---||---129
165---||---401---||---O Lamm Gottes, unschuldig---||---285
166---||---309---||---Es stehn vor Gottes Throne---||---93
167---||---300---||---Du großer Schmerzensmann, vom Vater so geschlagen---||---70
168---||---341---||---Heut ist, o Mensch, ein großer Trauertag---||---170
169---||---355---||---Jesu, der du selbsten wohl---||---189
170---||---62.6---||---Nun komm, der Heiden Heiland---||---0
171---||---408---||---Schaut, ihr Sünder! Ihr macht mir große Pein---||---303
172---||---410---||---Sei gegrüßet, Jesu gütig---||---307
173---||---400---||---O Herzensangst, o Bangigkeit und Zagen---||---284
174---||---364---||---Jesus Christus, unser Heiland, der den Tod überwandt---||---207
175---||---365---||---Jesus, meine Zuversicht---||---208
176---||---306---||---Erstanden ist der heilig Christ---||---85
177---||---253---||---Danket dem Herrn heut und allzeit---||---1
178---||---122.6---||---Das neugeborne Kindelein---||---57
179---||---140.7---||---Wachet auf, ruft uns die Stimme---||---329
180---||---265---||---Als Jesus Christus in der Nacht---||---21
181---||---319---||---Gott hat das Evangelium---||---116
182---||---14.5---||---Wär Gott nicht mit uns diese Zeit---||---0
183---||---388---||---Nun freut euch, lieben Christen, g'mein 1---||---261
184---||---4.8---||---Christ lag in Todesbanden---||---41
185---||---387---||---Ihr lieben Christen, freut euch nun---||---260
186---||---254---||---Ach Gott, erhör mein Seufzen und Wehklagen---||---2
187---||---370---||---Komm, Gott Schöpfer, heiliger Geist---||---218
188---||---349---||---Ach Herre Gott, mich treibt die Not---||---179
189---||---336---||---Herr Jesu Christ, wahr' Mensch und Gott---||---146
190---||---337---||---Herr, nun laß in Frieden---||---148
191---||---73.5---||---Von Gott will ich nicht lassen---||---0
192---||---321---||---Gottlob, es geht nunmehr zu Ende---||---118
193---||---424---||---Was bist du doch, o Seele, so betrübet---||---337
194---||---123.6---||---Liebster Immanuel, Herzog der Frommen---||---229
195---||---36.4-2---||---Wie schön leuchtet der Morgenstern---||---377
196---||---285---||---Da der Herr Christ zu Tische saß---||---52
197---||---276---||---Christ ist erstanden---||---36
198---||---283---||---Christus, der uns selig macht---||---48
199---||---343---||---Hilf, Gott laß mirs gelingen---||---172
200---||---284---||---Christus ist erstanden, hat überwunden---||---51
201---||---402---||---Es sind doch selig alle, die im rechten Glauben wandeln---||---286
202---||---407---||---O wir armen Sünder---||---301
203---||---403---||---O Mensch, schau Jesum Christum an---||---287
204---||---166.6---||---Wer nur den lieben Gott läßt walten---||---372
205---||---328---||---Herr Gott, dich loben wir, Herr Gott, wir danken dir---||---133
206---||---412---||---So gibst du nun, mein Jesu, gute Nacht---||---310
207---||---295---||---Spiritus sancti gratia---||---63
208---||---266---||---Am Sabbat früh Marien drei 1---||---22
209---||---299---||---Dir, dir, Jehova, will ich singen---||---67
210---||---275---||---Christe, du Beistand deiner Kreuzgemeine---||---0
211---||---426---||---Weltlich Ehr und zeitlich Gut---||---351
212---||---329---||---Lob sei dir, gütiger Gott---||---136
213---||---405---||---O wie selig seid ihr doch, ihr Frommen---||---299
214---||---383---||---Mitten wir im Leben sind---||---252
215---||---126.6---||---Verleih uns Frieden gnädlich---||---0
216---||---60.5---||---Es ist genug---||---91
217---||---153.9---||---Herr Jesu Christ, meins Lebens Licht---||---9
218---||---372---||---Herr, dein Ohren zu mir neige---||---226
219---||---406---||---Ach, wie groß ist Gottes Güt und Wohltat---||---300
220---||---413---||---Lasset uns den Herren preisen---||---311
221---||---338---||---Herr, straf mich nicht in deinem Zorn---||---149
222---||---391---||---Nun preiset alle Gottes Barmherzigkeit---||---273
223---||---346---||---Ich dank dir Gott für alle Wohltat---||---175
224---||---290---||---Das walt Gott Vater und Gott Sohn---||---58
225---||---316---||---Gott, der du selber bist das Licht---||---112
226---||---333---||---Herr Jesu Christ, du hast bereit---||---140
227---||---374---||---Lobet den Herren, denn er ist sehr freundlich---||---232
228---||---286---||---Vitam quae faciunt---||---53
229---||---350---||---Mein Hüter und mein Hirt ist Gott der Herre---||---180
230---||---273---||---Christ, der du bist der helle Tag---||---33
231---||---296---||---Die Nacht ist kommen, drin wir ruhen sollen---||---64
232---||---297---||---O höchster Gott, o unser lieber Herre---||---65
233---||---154.3---||---Werde munter, mein Gemüte---||---365
234---||---320---||---Gott lebet noch, Seele, was verzagst du doch?---||---117
235---||---325---||---Heilig, heilig, heilig---||---123
236---||---335---||---O Jesu, du mein Bräutigam---||---0
237---||---423---||---Was betrübst du dich, mein Herze---||---336
238---||---310---||---Es wird schier der letzte Tag herkommen---||---94
239---||---292---||---Den Vater dort oben---||---60
240---||---396---||---Nun sich der Tag geendet hat---||---274
241---||---425---||---Was willst du dich, o meine Seele, kränken---||---349
242---||---435---||---Wie bist du, Seele, in mir so gar betrübt---||---374
243---||---356---||---Jesu, du mein liebstes Leben---||---190
244---||---357---||---Jesu, Jesu, du bist mein---||---191
245---||---274---||---Christe, der du bist Tag und Licht---||---0
246---||---411---||---Singt dem Herrn ein neues Lied---||---309
247---||---432---||---Wenn wir in höchsten Nöten sein---||---359
248---||---177.4---||---Sei Lob und Ehr dem höchsten Gut---||---0
249---||---260---||---Allein Gott in der Höh sei Ehr---||---12
250---||---303---||---Ein feste Burg ist unser Gott---||---75
251---||---345---||---Ich bin ja, Herr, in deiner Macht---||---174
252---||---362---||---Jesu, nun sei gepreiset---||---203
253---||---77.6---||---Ach Gott, vom Himmel sieh' darein---||---6
254---||---25.6---||---Wie nach einer Wasserquelle---||---101
255---||---64.4---||---Die Wollust dieser Welt---||---280
256---||---194.6---||---Wie nach einer Wasserquelle---||---100
257---||---194.12---||---Nun laßt uns Gott dem Herren---||---268
258---||---378---||---Meine Augen schließ ich jetzt in Gottes Namen zu---||---240
259---||---42.7---||---Verleih uns Frieden gnädiglich (beginning)---||---322
259---||---42.7---||---Gib unsern Fürsten und aller Obrigkeit (ending)---||---322
260---||---307---||---Nun freut euch, lieben Christen, g'mein 2---||---262
261---||---158.4---||---Christ lag in Todesbanden---||---40
261---||---279---||---Christ lag in Todesbanden---||---40
262---||---2.6---||---Ach Gott, vom Himmel sieh' darein---||---7
263---||---227.1---||---Jesu, meine Freude---||---196
263---||---227.11---||---Jesu, meine Freude---||---196
264---||---361---||---Jesu, meines Herzens Freud'---||---202
265---||---144.6---||---Was mein Gott will, das g'scheh allzeit---||---343
266---||---48.7---||---Wenn mein Stündlein vorhanden ist 2---||---144
267---||---90.5---||---Vater unser im Himmelreich---||---319
268---||---389---||---Nun lob', mein Seel, den Herren---||---269
269---||---353---||---Wachet doch, erwacht, ihr Schläfer---||---186
270---||---161.6---||---Herzlich tut mich verlangen---||---161
271---||---315---||---Gib dich zufrieden und sei stille---||---111
272---||---348---||---Ich dank dir, lieber Herre---||---177
273---||---80.8---||---Ein feste Burg ist unser Gott---||---76
274---||---397---||---O Ewigkeit, du Donnerwort---||---275
275---||---393---||---O Welt, ich muß dich lassen---||---289
276---||---375---||---Kommt her, ihr lieben Schwesterlein---||---233
277---||---340---||---Herzlich lieb hab ich dich, o Herr---||---152
278---||---436---||---Wie schön leuchtet der Morgenstern---||---375
279---||---48.3---||---Ach Gott und Herr, wie groß und schwer---||---4
280---||---304---||---Eins ist not, ach Herr, dies eine---||---77
281---||---89.6---||---Auf meinen lieben Gott---||---26
282---||---25.6---||---Wie nach einer Wasserquelle---||---101
283---||---227.7---||---Jesu, meine Freude---||---199
284---||---127.5---||---Wenn einer schon ein Haus aufbaut---||---147
285---||---257---||---Wo Gott der Herr nicht bei uns hält---||---388
286---||---270---||---Herzlich tut mich verlangen---||---157
287---||---331---||---Herr, ich habe mißgehandelt---||---138
288---||---314---||---Gelobet seist du, Jesu Christ---||---107
289---||---392---||---Nun ruhen alle Wälder---||---298
290---||---9.7---||---Es ist das Heil uns kommen her---||---87
291---||---94.8---||---Die Wollust dieser Welt---||---281
292---||---101.7---||---Vater unser im Himmelreich---||---318
293---||---69.6-a---||---Was Gott tut, das ist wohlgetan---||---0
294---||---113.8---||---Wenn mein Stündlein vorhanden ist 2---||---142
295---||---335---||---Rex Christe factor omnium---||---145
296---||---390---||---Nun lob', mein Seel, den Herren---||---270
297---||---78.7---||---Wachet doch, erwacht, ihr Schläfer---||---188
298---||---19.7---||---Wie nach einer Wasserquelle---||---99
299---||---380---||---Meinen Jesum laß ich nicht---||---242
300---||---421---||---Warum betrübst du dich, mein Herz---||---332
301---||---114.7---||---Wo Gott, der Herr, nicht bei uns hält---||---386
302---||---343---||---Hilf, Gott, laß mirs gelingen---||---172
303---||---96.6---||---Herr Christ, der einge Gottes-Söhn---||---128
304---||---5.7---||---Auf meinen lieben Gott---||---28
305---||---36.4-2---||---Wie schön leuchtet der Morgenstern---||---377
306---||---402---||---Es sind doch selig alle, die im rechten Glauben wandeln---||---286
307---||---283---||---Christus, der uns selig macht---||---48
308---||---3.6---||---Ach Gott, wie manches Herzeleid---||---0
309---||---267---||---Ein Lämmlein geht und trägt die Schuld---||---0
310---||---245.22---||---Mach's mit mir, Gott, nach deiner Güt---||---239
311---||---287---||---Jesus Christ, unser Herre---||---54
312---||---398---||---Die Wollust dieser Welt---||---277
313---||---112.5---||---Allein Gott in der Höh sei Ehr---||---14
314---||---289---||---Das alte Jahr vergangen ist---||---56
315---||---399---||---O Gott, du frommer Gott---||---282
316---||---282---||---Christus, der ist mein Leben---||---47
317---||---156.6---||---Aus tiefer Not schrei ich zu dir 2---||---150
318---||---339---||---Aus tiefer Not schrei ich zu dir 2---||---151
319---||---325---||---Heilig, heilig, heilig---||---123
320---||---323---||---Meine Seel erhebt den Herren---||---120
321---||---40.3---||---Wir Christenleut---||---379
322---||---428---||---Wenn mein Stündlein vorhanden ist 1---||---353
323---||---172.6---||---Wie schön leuchtet der Morgenstern---||---376
324---||---81.7---||---Jesu, meine Freude---||---197
325---||---83.5---||---Mit Fried und Freud ich fahr dahin---||---250
326---||---104.6---||---Allein Gott in der Höh sei Ehr---||---13
327---||---190.7---||---Jesu, nun sei gepreiset---||---205
328---||---373---||---Liebster Jesu, wir sind hier---||---0
329---||---251---||---Es ist das Heil uns kommen Her---||---89
330---||---252---||---Nun danket alle Gott---||---258
331---||---136.6---||---Auf meinen lieben Gott---||---27
332---||---418---||---Von Gott will ich nicht lassen---||---325
333---||---69.6---||---Es woll uns Gott genädig sein 2---||---97
334---||---327---||---Ihr Knecht des Herren allzugleich---||---132
335---||---155.5---||---Es ist das Heil uns kommen her---||---88
336---||---258---||---Wo Gott, der Herr, nicht bei uns hält---||---383
337---||---24.6---||---O Gott, du frommer Gott---||---0
338---||---145-a---||---Jesus, meine Zuversicht---||---209
339---||---179.6---||---Wer nur den lieben Gott läßt walten---||---371
340---||---272---||---Lobet Gott, unsern Herren---||---32
341---||---37.6---||---Ich dank dir, lieber Herre---||---178
342---||---376---||---Kommt her, ihr lieben Schwesterlein---||---234
343---||---11.6---||---Ermuntre dich, mein schwacher Geist---||---82
344---||---248.23-2---||---Vom Himmel hoch, da komm ich her---||---0
345---||---248.5---||---Herzlich tut mich verlangen---||---165
346---||---381---||---Meines Lebens letzte Zeit---||---248
347---||---250---||---Was Gott tut das ist wohlgetan---||---339
348---||---70.11---||---Meinen Jesum laß ich nicht, weil er sich für mich gegeben---||---243
349---||---103.6---||---Was mein Gott will, das g'scheh allzeit---||---348
350---||---360---||---Werde munter, mein Gemüte---||---364
351---||---430---||---Wenn mein Stündlein vorhanden ist 1---||---355
352---||---312---||---Es woll uns Gott genädig sein 2---||---96
353---||---112.5---||---Allein Gott in der Höh sei Ehr---||---14
354---||---117.4---||---Sei Lob und Ehr dem höchsten Gut---||---0
355---||---44.7---||---O Welt, ich muß dich lassen---||---296
356---||---358---||---Jesu, meine Freude---||---195
357---||---422---||---Warum sollt ich mich denn grämen---||---334
358---||---10.7---||---Meine Seel erhebt den Herren---||---122
359---||---261---||---Allein zu dir, Herr Jesu Christ---||---15
360---||---248.35-3---||---Wir Christenleut---||---381
361---||---248.12-2---||---Ermuntre dich, mein schwacher Geist---||---80
362---||---248.59-6---||---Nun freut euch, lieben Christen, g'mein 2---||---263
363---||---395---||---O Welt, ich muß dich lassen---||---291
364---||---417---||---Von Gott will ich nicht lassen---||---324
365---||---359---||---Werde munter, mein Gemüte---||---363
366---||---394---||---O Welt, ich muß dich lassen---||---290
367---||---271---||---Herzlich tut mich verlangen---||---158
368---||---248.42-4---||---Hilf, Herr Jesu, laß gelingen 2---||---0
369---||---354---||---Wachet doch, erwacht, ihr Schläfer---||---187
370---||---74.8---||---Kommt her zu mir, spricht Gottes Söhn---||---223
371---||---278---||---Christ lag in Todesbanden---||---39`;

const CATALOGUE = Object.freeze(
  MUSIC_21_CATALOGUE.split('\n').reduce((acc, line) => {
    const [riemenschneider, bwv, title, kalmus] = line.split('---||---');
    return { ...acc, [bwv]: { riemenschneider, bwv, title, kalmus } };
  }, {}),
);

const CATALOGUE_BWVS = Object.keys(CATALOGUE);
const CATALOGUE_BWVS_SET = new Set(CATALOGUE_BWVS);

const SOURCE_FILES = fs.readdirSync('./data/corpus/');
const SOURCE_BWVS = SOURCE_FILES.map(f => f.slice(3, -4));
const SOURCE_BWVS_SET = new Set(SOURCE_BWVS);

const DB_BWVS = CATALOGUE_BWVS.filter(v => SOURCE_BWVS_SET.has(v));
const MISSING_XML = CATALOGUE_BWVS.filter(v => !SOURCE_BWVS_SET.has(v));

module.exports = {
  CATALOGUE,
  CATALOGUE_BWVS,
  CATALOGUE_BWVS_SET,
  SOURCE_FILES,
  SOURCE_BWVS,
  SOURCE_BWVS_SET,
  DB_BWVS,
  MISSING_XML,
};
