// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

let db = require('./models');

let breedList = [ 
  {
    name: 'Bluefaced Leicester',
    origin: 'England',
    status: 'n/a',
    stapleLength: '8 to 15 cm',
    fleeceWeight: '2 to 4.5 pounds',
    fiberDiameter: '56\'s to 60\'s',
    description: 'The Bluefaced Leicester is of the English Longwool type and originated near Hexham in the county of Northumberland, England, during the early 1900\'s. The breed was originally developed to use in the production of high quality crossbred ewes which were pastured in the neighboring hills of the region. They originated from Border Leicester individuals selected for the blue face (white hairs on black skin) and finer fleeces. They are found primarily in Northern England, Scotland and Wales.',
    image: 'n/a',
    infoSources: [ 
    'http://www.ansi.okstate.edu/breeds/sheep/bluefacedleicester' ], // preference is to grab OSU's description
  },
  {
    name: 'Bond',
    origin: 'Australia',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight:'',
    fiberDiameter: '22-28 micron',
    description: 'The Bond sheep was created in Australia in 1909 as a dual-purpose breed, using Peppin Merinos and imported Lincoln rams. They are still mainly found in southeast Australia, but their numbers span across Australia, New Zealand, China, and Russia.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/bond',
    ],
  },
    {
    name: 'Border Leicester',
    origin: 'England',
    status: 'n/a',
    stapleLength: 'five to ten inches (12.5-25cm)',
    fleeceWeight: '8 to 12 pounds',
    fiberDiameter: '36 to 48 which is 38.5 to 30.0 microns',
    description: 'Sheep with long, lustrous wool have been in Leicestershire, England since the earliest recorded history of the British Isles and are responsible for the improvement and development of other longwool breeds. Robert Bakewell (1726-95), third-generation farmer who resided at Dishley in Leicestershire, is credited with improvement of the Leicester sheep and also played an important role in the development of the Shire horse and Longhorn cattle. The breeding practices he used and advocated, mating closely related individuals to get desired type, were also influential in the early improvement of many other breeds of livestock.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/borderleicester',
    ],
  },
  {
    name: 'California Variegated Mutant (CVM)',
    origin: 'USA',
    status: 'Critical',
    stapleLength: '4 - 6 inches',
    fleeceWeight: '8 pounds',
    fiberDiameter: '60\'s to 62\'s',
    description: 'The Romeldale is a breed of sheep developed by A.T. Spencer. He purchased several New Zealand Romney Rams in 1915 that were brought to the Pan-American exposition in San Francisco. He felt the Romney breed would increase the staple, length, and carcass quality of his Rambouillets. Through many years of selection, the Romeldale breed was developed, with fleece properties of 60-64\'s, extremely high yield, and uniformity, including carcass cutability superior to other white-face breeds.' +
      'During the 1960\'s, Glen Eidman, a partner of J.K. Sexton, found in his purebred Romeldale flock a multi-colored ewe lamb. Two years later a ram lamb of the same barred pattern was born and when crossed with the ewe, the resulting offspring were of the same color pattern. Through subsequent breeding and further mutants from the Romeldale flock, the C.V.M. Breed was born. These sheep, christened C.V.M.\'s or California Variegated Mutants, were kept by Eidman who then placed emphasis on spinability of the fleece, twinning, and lambing ease. During the 15 years Mr. Eidman spent developing the breed, not a single replacement ewe or ram was sold so that only the highest quality of genetics were used to replace the nucleus.',
    image: 'n/a',
    infoSources: [ 
      'http://www.ansi.okstate.edu/breeds/sheep/californiavariegatedmutant',
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep' 
    ], 
   },
  {
    name: 'Columbia',
    origin: 'USA',
    status: 'n/a',
    stapleLength: '3.5 to 5 inches (9-13 cm)',
    fleeceWeight: '10 to 16 pounds (4.5 - 7.3 kg)', 
    fiberDiameter:'31.0 to 24.0 microns',
    description: 'Columbia sheep were developed by the United States Department of Agriculture as a true breeding type to replace cross breeding on the range. In 1912, rams of the long wool breeds were crossed with high quality Rambouillet ewes to produce large ewes yielding more pounds of wool and more pounds of lamb. The first cross Lincoln-Rambouillet line was the most promising of all crosses. The Bureau of Animal Industry maintained this line and by intensive breeding and selection produced a true breeding strain with characteristics of the superior cross-bred line.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/columbia',
    ],
  },
  {
    name: 'Coopworth',
    origin: 'New Zealand',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '30-35 microns',
    description: 'Coopworth sheep were imported to Australia in 1976, after being developed in New Zealand in the 1950s from a cross of Border Leicester and Romney. ' +
      'Coopworths have been selected on visual criteria, wool quality, frame and carcass attributes, and measured performance, including fertility and lamb survival, growth rate to weaning, growth rate to yearling stage, leanness, growth and fleece production of 30-35 micron wool.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/coopworth',
    ],
  },
  {
    name: 'Cormo',
    origin: 'Australia',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '17-23 micron range',
    description: 'The Cormo were developed in the earlier part of the 1960\'s in Tasmania, Australia. To arrive at the current day Cormo rams of the Corriedale breed were crossed with Superfine Saxon Merinos. The name Cormo is from the names of two of the parent breeds, Corriedale and Merino.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/cormo',
    ],
  },
  {
    name: 'Corriedale',
    origin: 'New Zealand and Australia',
    status: 'n/a',
    stapleLength: '3.5 to 6 inches',
    fleeceWeight: '10 to 17 pounds (mature ewes)',
    fiberDiameter: '31.5 to 24.5 micron',
    description: 'The Corriedale was developed in New Zealand and Australia during the late 1800s\' from crossing Lincoln or Leicester rams with Merino females. The development of the breed occurred in New Zealand during the time from 1880 to 1910. Similar crosses were also being done in Australia during this time. The breed is now distributed worldwide, making up the greatest population of all sheep in South America and thrives throughout Asia, North America and South Africa. Its popularity now suggests it is the second most significant breed in the world after Merinos.',  
    image: 'n/a',
    infoSources: [ 'http://www.ansi.okstate.edu/breeds/sheep/corriedale/' ], // preference is to grab OSU's description
  },
  {
    name: 'Cotswold',
    origin: 'England',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '',
    description: 'The Cotswold breed originated in the Cotswold Hills of Gloucester, a south midland county of England touching the Bristol Channel. The Cotswold Hills cover an area of about 280,000 acres, have an average elevation of between 500 and 600 feet and are not particularly fertile. The soils do contain considerable lime, and the area raises fair crops of small grains and roots. Because of its mild, temperate climate, the area is well suited to sheep raising. The name "Cotswold" was given the breed because in the early days they were folded or housed in shelters known locally as "cots" or "cotes" and they were pastured on the wild, treeless hills of the area, called "wolds".',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/cotswold',
    ],
  },
  {
    name: 'Finnsheep',
    origin: 'Finland',
    status: 'n/a',
    stapleLength: 'three to six inches (7.5-15 cm)',
    fleeceWeight: 'four to eight pounds (1.8 to 3.6 kg) (mature ewe)',
    fiberDiameter: '50 to 60 or 23.5 to 31.0 microns',
    description: 'Finnsheep or Finnish Landrace, as they are their native country of Finland, were first imported to North America by the University of Manitoba, Canada in 1966. Since that time, only a few importations have occurred through the U.S. Department of Agriculture (1968) and private breeders in Canada. Progeny from the Canadian importation were then brought into the United States by private producers.' +
      'The breed is considered to be several hundred years old, descending from the mouflon that live in the wild on Sardinia and Corsica. They are also said to be related to other Scandinavian short-tailed sheep. Their origin is probably related to their high adaptability to the rugged climate and the high roughage feed available.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/finnsheep',
    ],
  },
  {
    name: 'Friesian Milk Sheep',
    origin: 'Friesland',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '4.5 kg per ewe',
    fiberDiameter: '50/56s / 48/50s',
    description: '',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/friesianmilk',
    ],
  },
  {
    name: 'Gotland',
    origin: 'Sweden',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '29 to 34 microns',
    description:'The breed was first established on the Swedish island of Gotland by the Vikings with Karakul and Romanov sheep brought back from expeditions deep into Russia and crossed with the native landrace sheep. The Vikings were great seafarers as well as sheep farmers and took these animals on their extensive voyages to provide meat and skins along the route. Hence the spread of these Northern short-tailed sheep and the development into related breeds such as Goth sheep, Icelandic, Finnsheep, Shetland, North Ronaldsay and Manx. Primitive horned Gotland sheep still exist on the island of Gotland today. The Gotland Peltsheep (pälsfår) or modern Gotland has been developed in Sweden since the 1920\'s through controlled breeding and intensive selection, producing a true multipurpose long wool sheep, yielding good flavored close-grained meat, furskins and soft silky lustrous fleece. Gotland sheep may also be found in Sweden, Britain, Denmark, New Zealand and Australia.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/gotland/index.html/',
    ],
  },
  {
    name:'Herdwick',
    origin: 'England',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '',
    description: 'The Herdwick is found in the Lake District of northwestern England, on the Fells of Westmorland and Cumberland. They are a carpet wool and meat breed. The lambs are born with black faces, legs and blue-roan fleeces which lighten in the adults. The males are horned and the females are polled or naturally hornless.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/herdwick',
    ],
  },
  {
    name: 'Icelandic',
    origin: 'Iceland',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight:'4-5 lbs',
    fiberDiameter: '',
    description: 'The modern Icelandic Sheep is a direct descendant of the sheep brought to the island by the early Viking settlers, in the ninth and tenth century. It is of the North European Short Tailed type, related to such breeds as the Finnsheep, Romanov, Shetland, Spelsau sheep and the Swedish Landrace, all of which are descendants of this type of sheep which was predominate in Scandinavia and the British Isles during 8th and 9th century. Of these the Icelandic and the Romanov are the largest, classified as medium size. ' +
      'Very few attempts have been made to "improve" the Icelandic sheep through the centuries with outside crossings. The few attempts that were made, resulted in disasters brought on by diseases brought in by the "new blood". As a result producers drastically culled all animals which were results of crossbreeding. As a consequence all effect of other breeds was eliminated. It is now illegal to import any sheep into Iceland. As a result of these factors improvements to the breed have been done by selective breeding within the breed itself. Genetically the Icelandic sheep is the same today as it was 1100 years ago. It is possibly the oldest and purest domesticated breed of sheep in the world today.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/icelandic',
    ],
  },
  {
    name: 'Jacob',
    origin: 'UK',
    status: 'Threatened',
    stapleLength: '',
    fleeceWeight: 'three or four pounds',
    fiberDiameter: '',
    description: 'The Jacob sheep is indeed a unique breed in America. Slight of build, with the narrow, lean carcass typical of some of the ancient British breeds, they are immediately noticeable due to their black and white fleeces and prominent horns. Both males and females are horned, sporting two, four and occasionally six horns. Most striking to many people are four-horned rams with two vertical center horns as much as two feet long, and two side horns curling down along the side of the head. Two-horned rams develop the more familiar classic double curl. Horns on the ewe are always shorter and more delicate than the rams\' horns.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/jacob',
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep', 
    ],
  },
  {
    name: 'Leicester Longwool',
    origin: 'England',
    status: 'Threatened',
    stapleLength: '200-250mm',
    fleeceWeight: '11 to 15 pounds',
    fiberDiameter: '32-38 micron',
    description: 'The breed was developed in the 1700\'s by Robert Bakewell. Bakewell was the first to utilize modern animal breeding techniques in the selection of livestock. Using these practices he developed the Leicester Longwool from the old Leicester sheep. His selection techniques changed a coarsely boned, slow growing Leicester into an animal that put on weight more rapidly and produced less waste when slaughtered. Robert Bakewell deserves recognition for his work with these sheep because it changed livestock farming forever and because it influenced the work of people such as Charles Darwin and Gregor Mendel.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/leicesterlongwool',
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep', 
    ],
  },
  {
    name: 'Lincoln',
    origin: 'England',
    status: 'Threatened',
    stapleLength: 'eight to fifteen inches (20-38 cm)',
    fleeceWeight: '12 to 20 pounds (5.4-9kg)',
    fiberDiameter: ' 41.0 to 33.5 microns',
    description: 'The present-day Lincoln is said to be the result of crossing the Leicester and the coarse native sheep of Lincolnshire. Not all breeders cared for the greater refinement and increased quality that Leicester blood introduced, but in the end, market demand resulted in improved carcasses and higher quality wool. The old Lincolnshire sheep was gradually modified by cross breeding and selection toward a more useful sheep than the extremely large and thin-fleshed sheep originally found in the area. Many breeders had a part in the improvement of the Lincoln sheep, but probably the most constructive breeders were members of the Dudding family of Great Grimsby in Lincolnshire, because this family bred Lincoln sheep for a period of about 175 years. The flock was not dispersed until 1913 and furnished many animals for export to other countries, particularly to Argentina.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/lincoln',
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep', 
    ],
  },
  {
    name: 'Merino',
    origin: 'Australia',
    status: 'n/a',
    stapleLength: 'approximately 90mm',
    fleeceWeight: '',
    fiberDiameter: '20-22 microns',
    description: '',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/mediumwoolmerino',
    ],
  },
  {
    name: 'Mystery Black Sheep',
    origin: '',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '',
    description: 'Remember that black wool you swore you would always remember? *That* one.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/polwarth',
    ],
  },
  {
    name: 'Mystery White Sheep',
    origin: 'Australia',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '22-25 micron',
    description: 'Remember that white wool you swore you would always remember? *That* one.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/polwarth',
    ],
  },
  {
    name: 'Polwarth',
    origin: 'Australia',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '22-25 micron',
    description: 'The Polwarth is a dual-purpose sheep, developed in Victoria in 1880. It is 75 percent Merino and 25 percent Lincoln. Polwarths are well suited to areas with improved pastures and are mainly found in the higher rainfall districts of southern Australia. The breed has been successfully exported to many countries, particularly South America where they are know as "Ideals".',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/polwarth',
    ],
  },
  {
    name: 'Polypay',
    origin: 'USA',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '',
    description: 'The Polypay was born out of frustration and a dream in the the late 1960\'s. The frustration was in needing more productive sheep to make a profit. The dream was to develop sheep which would produce two lamb crops and one wool crop per year. Led by Dr. C.V. Hulet, the scientists at the U.S. Sheep Experimentation Station in Dubois, Idaho developed five primary goals for the dream breed:' +
      '* High lifetime prolificacy' +
      '* Large lamb crop at one year of age' +
      '* Ability to lamb more frequently than once per year' +
      '* Rapid growth rate of lambs' +
      '* Desirable carcass quality',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/polypay',
    ],
  },
  {
    name: 'Rambouillet',
    origin: 'France',
    status: 'n/a',
    stapleLength: 'two to four inches (5-10 cm)',
    fleeceWeight: '8 to 18 pounds (3.6-8.1 kg) (mature ewes)',
    fiberDiameter: '18.5 to 24.5 microns',
    description: 'The history of the Rambouillet sheep is a fascinating one that began more than two centuries ago. The Rambouillet breed originated with Spain\'s famed Merino flocks, which were known from the earliest times as producers of the world\'s finest wool. The Spanish government was so protective of their Merino flocks that any exportation was forbidden. ' +
      'This policy changed in 1786, however, when the King of Spain granted a request from the government of France and sent 359 carefully selected rams and ewes to help improve the native French stock. The sheep were sent to the Rambouillet farm near Paris where, according to government records, they have been bred since 1801.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/rambouillet',
    ],
  },
  {
    name: 'Romeldale',
    origin: '',
    status: 'Critical',
    stapleLength: '',
    fleeceWeight: '',
    fiberDiameter: '',
    description: '',
    image: 'n/a',
    infoSources: [
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep', 
    ],
  },
  {
    name: 'Romney',
    origin: 'England',
    status: 'n/a',
    stapleLength: '',
    fleeceWeight: 'eight to twelve pounds (3.6-5.4 kg) (mature ewes',
    fiberDiameter: '38.0 to 31.0 microns',
    description: 'The Romney traces its beginning to the marshy area of Kent in England. Its origin lies with the old, established dual purpose Romney Marsh breed which was improved with Leicester blood in the nineteenth century. Often swept with harsh winds and heavy rainfall, the Kent landscape is abundant with lush forage.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/romney',
    ],
  },
  {
    name: 'Shetland',
    origin: 'UK',
    status: 'Recovering',
    stapleLength: '2 to 4.5 inches (50-120mm)',
    fleeceWeight: '2 and 4 pounds (1-1 1/2 kg)',
    fiberDiameter: '20 -25 microns',
    description: 'The Shetland\'s roots go back over a thousand years, probably to sheep brought to the Shetland Islands by viking settlers. They belong to the Northern European short-tailed group which also contains the Finnsheep, Norwegian Spaelsau, Icelandics, Romanovs and others. ' +
      'The Shetland is the smallest of the British breeds and it retains many of the characteristics of wild sheep. Today they are considered a primitive or "unimproved" breed. Rams usually weigh 90 to 125 pounds and ewes about 75 to 100 pounds. Rams usually have spiral horns, whereas the ewes are typically polled. They are fine-boned and their naturally short, fluke-shaped tails do not require docking.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/shetland',
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep', 
    ],
  },
  {
    name: 'Southdown',
    origin: 'England',
    status: 'Recovering',
    stapleLength: '1.5 to 2.5 inches (4-6 cm)',
    fleeceWeight: 'five and eight pounds (2.25-3.6 kg) (mature ewe)',
    fiberDiameter: '23.5 to 29.0 microns',
    description: 'The Southdown were developed in Sussex, England during the late 1700 and early 1800s\'.  Documented importations were made into Pennsylvania from 1824 to 1829 from the English Flock of John Ellman. Later irnportations from the Jonas Webb flock were made into Pennsylvania, New York and Illinois.  These two men are considered by many to be the standardizer and main improver of the breed. As expected, many of the early registered sheep were imported from England.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/southdown',
      'https://livestockconservancy.org/index.php/heritage/internal/conservation-priority-list#Sheep', 
    ],
  },
  {
    name: 'Targhee',
    origin: 'USA',
    status: 'n/a',
    stapleLength: '3-5" (7.5-11 cm)',
    fleeceWeight: '10-14 pound (4.5-6.3 kg) (mature ewe)',
    fiberDiameter: '25-21 micron',
    description: 'The Western sheep industry about 1900 was based on Merinos and Rambouillets with the emphasis on raising wool. Shortly after the turn of the century a demand began for lamb and this led to a crossing of the fine wooled sheep to develop a better lamb producing animal. The most popular method to achieve this goal was the crossing of an English longwool breed with the fine wooled breeds, that were the basis of the Western sheep industry.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/targhee',
    ],
  },
  {
    name: 'Teeswater',
    origin: 'England',
    status: 'n/a',
    stapleLength: 'eight to twelve inches',
    fleeceWeight: '',
    fiberDiameter: '',
    description: 'When the Romans invaded Britain, they brought with them a large, longwool sheep breed. This breed has branched off into many different breeds, named for the region they branched off into. These breeds are the Cotswold, Lincoln, Leicester, Devon Longwools, and the Teeswater. The Teeswater is found in Northern England, especially Teesdale, County Durham. Teeswater in Repose ' +
      'In the early 1900s, the Teeswater had a brush with extinction. This is due to the Wensleydale breed increasing in popularity, and the Teeswater sharply decreasing. The breed only survived due to several farmers keeping Teeswater rams to cross with hill sheep ewes. Today, the value of these rams for cross-breeding is better-known, and they have become more prevalent, although still rare.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/teeswater',
    ],
  },
  {
    name: 'Wensleydale',
    origin: 'UK',
    status: 'n/a',
    stapleLength: 'up to 12"',
    fleeceWeight: 'up to 5 kg',
    fiberDiameter: '',
    description: 'A blue-faced, long wool breed producing a fleece with a very long staple (up to 12") and weighing up to 5 kg. A slow maturing breed, ewes weigh about 113 kg and rams may exceed 135 kg. Both sexes are polled. Carefully and selectively bred for fine, curly fleece. Often blended with fine but shorter-stapled wools where a strong wool is required. Crossed with certain other breeds such as Suffolk, it produces offspring capable of growing fleeces with weights up to 11 kg of good quality wool. Wensleydale are mostly kept for rams for crossing purposes.',
    image: 'n/a',
    infoSources: [
      'http://www.ansi.okstate.edu/breeds/sheep/wensleydale',
    ],
  },
];

console.log('well, i am here');
db.Breed.remove({}, function(err, breeds){
  console.log('afterbreed.remove');
  if (err) { return console.log('ERROR::' + err); }
  breedList.forEach(function(breedName) {
    console.log('inside forEach');

    db.Breed.create(breedName, function(err, theBreed) {
       if (err) { return console.log('ERROR::' + err); }
       console.log('saved ' + theBreed);
     });
  });
});
