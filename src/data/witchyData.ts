import { BlogPost, EventItem, GalleryItem, ImageHotspot, ShopItem, Track } from '../types';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'recording-spooky-lullaby-music-box',
    title: 'Recording "Spooky Lullaby" on a 1978 Music Box & Tape Echo',
    category: 'Behind the EP',
    date: 'Nov 14, 2024',
    readTime: '5 min read',
    author: 'Mina Bell',
    excerpt:
      'How a dusty thrift-store wind-up music box became the rhythmic spine of our new five-track EP, paired with worn cassette saturation.',
    motif: 'music-box',
    featured: true,
    linkedTrackId: 'ep-1',
    pullQuote:
      'When you slow a wind-up cylinder down by half a speed on tape, every tiny metallic click turns into moonlight.',
    paragraphs: [
      'When we first started sketching the title track for "Spooky Lullaby," every digital synth preset felt too polished. Witchy Tunes has always lived in the space between childhood nostalgia and midnight folk songs, so we went hunting through local antique bins for something mechanical and slightly imperfect.',
      'We found a 1978 brass-cylinder music box tucked inside a velvet jewelry case. On its own, the chime was bright and hurried. Once we miked it with a single ribbon mic six inches away and ran it through an old reel-to-reel tape echo at half speed, the chime dropped an octave into a warm, swaying pulse.',
      'From there, the rest of the arrangement fell into place in a single rainy afternoon. We layered soft felt piano chords, brushed snare whispers, and close-mic harmonies recorded under a blanket fort to keep the room reflections intimate.',
      'If you listen closely around the second chorus, you can still hear the brass key winding down right before the final chord fades out. Leaving those human textures intact is what makes the coven sound feel alive.'
    ],
    comments: [
      {
        id: 'c-1',
        author: 'Clara V.',
        date: 'Nov 15, 2024',
        body: 'That winding key click at 1:42 is genuinely my favorite detail on the entire EP. Feels like sitting in the studio with you.'
      },
      {
        id: 'c-2',
        author: 'Julian Reed',
        date: 'Nov 16, 2024',
        body: 'Tried running a toy glockenspiel through tape delay after reading this and it unlocked two new song drafts.'
      }
    ]
  },
  {
    id: 'post-2',
    slug: 'out-of-tune-upright-piano-character',
    title: 'Why Every Cozy Witchy Track Needs an Honest Upright Piano',
    category: 'Studio Gear',
    date: 'Nov 03, 2024',
    readTime: '4 min read',
    author: 'Mina Bell',
    excerpt:
      'Perfectly quantized grand pianos have their place, but felt dampers and gentle pitch drift tell a warmer story.',
    motif: 'upright-piano',
    linkedTrackId: 'mix-3',
    pullQuote:
      'A slightly drifted B-flat string creates natural chorus before you ever touch an effect pedal.',
    paragraphs: [
      'Our studio upright was built in 1964 and weighs roughly as much as a small moon. Every autumn, when the coastal humidity drops, the upper register drifts a few cents flat in unison—giving major-seventh chords a tender, dreamy shimmer.',
      'Instead of tuning it to clinical perfection every month, we drape a strip of wool felt between the hammers and the strings. Pressing the soft pedal lets the felt mute the attack so only the wooden resonance blooms into the room.',
      'Pair that felt piano with a simple omnidirectional condenser mic placed near the bottom soundboard, and suddenly a three-chord lullaby sounds like a memory you forgot you had.'
    ],
    comments: [
      {
        id: 'c-3',
        author: 'Sora K.',
        date: 'Nov 05, 2024',
        body: 'Felt pianos are pure comfort. Would love a close-up photo of the wool strip setup next time.'
      }
    ]
  },
  {
    id: 'post-3',
    slug: 'midnight-attic-listening-rooms',
    title: 'Notes from the Midnight Attic Tour: Candles, Vinyl & Quiet Rooms',
    category: 'Tour Diary',
    date: 'Oct 22, 2024',
    readTime: '6 min read',
    author: 'Mina Bell & Theo',
    excerpt:
      'Three weeks playing intimate bookshops and candlelit lofts instead of loud bars—and what it taught us about listening.',
    motif: 'candle-tour',
    linkedTrackId: 'ep-3',
    pullQuote:
      'When nobody has to shout over an espresso grinder, you can sing at conversation volume and feel the whole room lean in.',
    paragraphs: [
      'Last month we packed a single suitcase of Omnichords, cassette loops, and forty lavender test-pressing sleeves for a five-city bookshop tour. Rather than booking late-night club slots, we asked independent bookstores and tea rooms if we could play right after closing.',
      'Each evening started with a listening session: we spun two unreleased mixes on a portable turntable while folks sipped chamomile tea and sketched in shared notebooks.',
      'Playing acoustic lullabies in rooms surrounded by paperbacks changed how we pace our setlist. Silence became an instrument. Between songs, the creak of floorboards and clink of teacups became part of the arrangement.'
    ],
    comments: [
      {
        id: 'c-4',
        author: 'Elena M.',
        date: 'Oct 24, 2024',
        body: 'The Portland bookshop night was magical. Still have my lyric zine tucked inside my planner.'
      }
    ]
  },
  {
    id: 'post-4',
    slug: 'artwork-palette-pink-lime-ink',
    title: 'Designing the Coven Aesthetic: Blush Pink, Acid Lime & Bold Ink',
    category: 'Behind the EP',
    date: 'Oct 11, 2024',
    readTime: '4 min read',
    author: 'Mina Bell',
    excerpt:
      'Why we traded dark gothic clichés for hand-drawn hearts, lemon-lime buttons, and cozy storybook linework.',
    motif: 'palette-zine',
    linkedTrackId: 'mix-1',
    pullQuote:
      'Spooky does not have to mean dreary. Our favorite kind of magic feels like a pastel sticker sheet at midnight.',
    paragraphs: [
      'When people hear the name "Witchy Tunes," they often expect brooding black velvet and fog machines. Yet the music itself is gentle, bright-eyed, and a little playful—like humming to yourself while brewing peppermint tea.',
      'When sketching the mascot and homepage layout, we anchored everything in crisp ink-black outlines, candy-blush pink paper, lavender badges, and punchy acid-lime buttons that pop right off the screen.',
      'Every cover zine, enamel pin, and vinyl insert uses this exact palette so picking up a physical record feels like stepping straight into the website.'
    ],
    comments: []
  },
  {
    id: 'post-5',
    slug: 'spooky-melodies-mix-liner-notes',
    title: '12 Cozy Witchy Tracks: Track-by-Track Liner Notes for the Mix',
    category: 'Songwriting',
    date: 'Sep 29, 2024',
    readTime: '7 min read',
    author: 'Mina Bell',
    excerpt:
      'A behind-the-scenes walkthrough of all twelve melodies in our Now Playing mix, including chord voicings and late-night prompts.',
    motif: 'cassette-mix',
    linkedTrackId: 'mix-2',
    pullQuote:
      'Every track on the mix started as a ninety-second voice memo recorded on walks after dusk.',
    paragraphs: [
      'The Spooky Melodies Mix started as a personal cassette we dubbed for friends during October rainstorms. Over time it grew into twelve short vignettes—half instrumental music-box sketches, half whispered vocal ballads.',
      'Tracks 1 through 4 lean into warm major-ninth chords in F and D, built for studying or journaling. Tracks 5 through 8 shift toward plucked harp arpeggios and brush percussion.',
      'The closing four tracks slow down to 68 BPM so the tape winds down gently if you fall asleep with headphones on.'
    ],
    comments: []
  },
  {
    id: 'post-6',
    slug: 'pressing-the-lavender-vinyl',
    title: 'Pressing the Lavender Vinyl Edition: Test Pressings & Gatefolds',
    category: 'Studio Gear',
    date: 'Sep 14, 2024',
    readTime: '5 min read',
    author: 'Theo Moss',
    excerpt:
      'What happens when you take bedroom tape recordings to a mastering lathe for translucent lilac 12-inch vinyl.',
    motif: 'lavender-vinyl',
    linkedTrackId: 'ep-5',
    pullQuote:
      'Hearing tape hiss and music-box overtones drop cleanly onto physical wax is still pure alchemy.',
    paragraphs: [
      'Mastering cozy lo-fi music for vinyl requires restraint. If you leave too much stereo sub-bass in a felt piano note, the cutting stylus jumps; if you brighten the chimes too aggressively, sibilance creeps in.',
      'We worked closely with our mastering engineer over three test pressings until the translucent lavender wax held every whisper of the room without losing its warmth.',
      'Each first-edition sleeve includes a numbered lyric postcard and a pressed chamomile tea sachet.'
    ],
    comments: []
  }
];

export const ALL_TRACKS: Track[] = [
  // Spooky Lullaby EP (5 tracks)
  {
    id: 'ep-1',
    title: 'Spooky Lullaby (Music Box Intro)',
    collection: 'Spooky Lullaby EP',
    duration: '2:48',
    durationSec: 168,
    bpm: 76,
    notes: [523.25, 659.25, 783.99, 987.77, 783.99, 659.25, 587.33, 493.88],
    story: 'Recorded on a 1978 brass music box slowed down through cassette echo.'
  },
  {
    id: 'ep-2',
    title: 'Velvet Hat & Starlight',
    collection: 'Spooky Lullaby EP',
    duration: '3:14',
    durationSec: 194,
    bpm: 84,
    notes: [440, 523.25, 659.25, 880, 783.99, 659.25, 587.33, 523.25],
    story: 'Felt upright piano paired with warm Omnichord strums.'
  },
  {
    id: 'ep-3',
    title: 'Midnight Attic Tea',
    collection: 'Spooky Lullaby EP',
    duration: '3:02',
    durationSec: 182,
    bpm: 72,
    notes: [392.0, 493.88, 587.33, 739.99, 587.33, 493.88, 440.0, 392.0],
    story: 'Written on the road between independent bookshop listening nights.'
  },
  {
    id: 'ep-4',
    title: 'Paper Hearts on Pink Wallpaper',
    collection: 'Spooky Lullaby EP',
    duration: '2:36',
    durationSec: 156,
    bpm: 90,
    notes: [587.33, 739.99, 880.0, 1174.66, 880.0, 739.99, 659.25, 587.33],
    story: 'Upbeat acoustic bounce inspired by hand-drawn zine stickers.'
  },
  {
    id: 'ep-5',
    title: 'Moonbeam Cassette (Outro)',
    collection: 'Spooky Lullaby EP',
    duration: '3:40',
    durationSec: 220,
    bpm: 66,
    notes: [349.23, 440.0, 523.25, 659.25, 523.25, 440.0, 392.0, 349.23],
    story: 'Slow tape fade with gentle twilight bell harmonics.'
  },

  // Spooky Melodies Mix (12 tracks)
  {
    id: 'mix-1',
    title: '01. Coven Welcome Chime',
    collection: 'Spooky Melodies Mix',
    duration: '2:12',
    durationSec: 132,
    bpm: 80,
    notes: [523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 523.25],
    story: 'Opening motif welcoming listeners into the Witchy Tunes attic.'
  },
  {
    id: 'mix-2',
    title: '02. October Rain on Skylights',
    collection: 'Spooky Melodies Mix',
    duration: '2:54',
    durationSec: 174,
    bpm: 74,
    notes: [440.0, 554.37, 659.25, 880.0, 659.25, 554.37, 493.88, 440.0],
    story: 'Soft celesta arpeggios written during a thunderstorm.'
  },
  {
    id: 'mix-3',
    title: '03. Felt Piano Waltz',
    collection: 'Spooky Melodies Mix',
    duration: '3:08',
    durationSec: 188,
    bpm: 78,
    notes: [392.0, 493.88, 659.25, 783.99, 659.25, 493.88, 440.0, 392.0],
    story: 'Close-miked 1964 upright piano in 3/4 time.'
  },
  {
    id: 'mix-4',
    title: '04. Lavender Potion Steep',
    collection: 'Spooky Melodies Mix',
    duration: '2:45',
    durationSec: 165,
    bpm: 70,
    notes: [349.23, 440.0, 523.25, 698.46, 659.25, 523.25, 440.0, 349.23],
    story: 'Dreamy major-ninth pad ideal for late-night reading.'
  },
  {
    id: 'mix-5',
    title: '05. Candlewick Bookmark',
    collection: 'Spooky Melodies Mix',
    duration: '2:28',
    durationSec: 148,
    bpm: 82,
    notes: [493.88, 587.33, 739.99, 987.77, 739.99, 587.33, 523.25, 493.88],
    story: 'Plucked harp tones recorded on a four-track cassette deck.'
  },
  {
    id: 'mix-6',
    title: '06. Starlight Omnichord',
    collection: 'Spooky Melodies Mix',
    duration: '3:01',
    durationSec: 181,
    bpm: 86,
    notes: [523.25, 587.33, 659.25, 880.0, 783.99, 659.25, 587.33, 523.25],
    story: 'Classic strumplate chords shimmering through chorus.'
  },
  {
    id: 'mix-7',
    title: '07. Pumpkin Spice Sketch',
    collection: 'Spooky Melodies Mix',
    duration: '2:19',
    durationSec: 139,
    bpm: 88,
    notes: [440.0, 523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440.0],
    story: 'Playful midday melody from a corner bakery voice memo.'
  },
  {
    id: 'mix-8',
    title: '08. Witching Hour Wind Chimes',
    collection: 'Spooky Melodies Mix',
    duration: '3:22',
    durationSec: 202,
    bpm: 68,
    notes: [329.63, 440.0, 523.25, 659.25, 587.33, 523.25, 440.0, 392.0],
    story: 'Porch bells sampled under the September harvest moon.'
  },
  {
    id: 'mix-9',
    title: '09. Sweater Weather Tape Loop',
    collection: 'Spooky Melodies Mix',
    duration: '2:40',
    durationSec: 160,
    bpm: 75,
    notes: [392.0, 493.88, 587.33, 783.99, 659.25, 587.33, 493.88, 392.0],
    story: 'Five-second physical cassette loop spliced by hand.'
  },
  {
    id: 'mix-10',
    title: '10. Crescent Moon Postcard',
    collection: 'Spooky Melodies Mix',
    duration: '2:51',
    durationSec: 171,
    bpm: 72,
    notes: [440.0, 493.88, 659.25, 880.0, 739.99, 659.25, 493.88, 440.0],
    story: 'Sent as an audio postcard to pen-pal subscribers.'
  },
  {
    id: 'mix-11',
    title: '11. Sugarplum Spellbook',
    collection: 'Spooky Melodies Mix',
    duration: '2:35',
    durationSec: 155,
    bpm: 79,
    notes: [523.25, 659.25, 880.0, 1046.5, 880.0, 783.99, 659.25, 523.25],
    story: 'Music-box harmonies layered three octaves high.'
  },
  {
    id: 'mix-12',
    title: '12. Goodnight, Little Coven',
    collection: 'Spooky Melodies Mix',
    duration: '3:30',
    durationSec: 210,
    bpm: 64,
    notes: [349.23, 440.0, 523.25, 659.25, 587.33, 440.0, 392.0, 349.23],
    story: 'Gentle closing lullaby fading softly to silence.'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'shop-vinyl',
    name: '"Spooky Lullaby" Lavender 12" Vinyl',
    category: 'Vinyl',
    price: 28,
    description: 'Translucent lilac 180g pressing with hand-illustrated gatefold sleeve and lyric postcard.',
    detail: 'Limited First Pressing · 5 Tracks',
    motif: 'lavender-vinyl'
  },
  {
    id: 'shop-pin',
    name: 'Pink Witch Hat Enamel Pin',
    category: 'Merch',
    price: 12,
    description: 'Hard enamel lapel pin featuring our signature crescent-moon pink witch hat with gold trim.',
    detail: '1.5 inch · Double rubber clutch',
    motif: 'witch-hat'
  },
  {
    id: 'shop-potion',
    name: 'Midnight Chamomile & Lavender Tea',
    category: 'Potions',
    price: 16,
    description: 'Small-batch caffeine-free botanical loose-leaf blend crafted for late-night listening sessions.',
    detail: '60g Apothecary Tin · ~25 cups',
    motif: 'potion-tea'
  },
  {
    id: 'shop-zine',
    name: 'Coven Lyric & Chord Zine (Issue 01)',
    category: 'Merch',
    price: 14,
    description: '36-page risograph booklet packed with handwritten chords, studio diagrams, and tour doodles.',
    detail: 'Soy-ink risograph · Blush & Lime',
    motif: 'palette-zine'
  },
  {
    id: 'shop-cassette',
    name: 'Spooky Melodies Mix Cassette',
    category: 'Vinyl',
    price: 15,
    description: 'Pastel pink shell cassette loaded with all 12 cozy witchy tracks and fold-out J-card.',
    detail: 'Chrome C-45 · Hand-numbered',
    motif: 'cassette-mix'
  },
  {
    id: 'shop-elixir',
    name: 'Rose & Cardamom Room Mist',
    category: 'Potions',
    price: 22,
    description: 'Warm botanical linen and studio mist blending wild rose, toasted cardamom, and cedar.',
    detail: '100ml Amber Glass Atomizer',
    motif: 'crescent-moon'
  }
];

export const TOUR_EVENTS: EventItem[] = [
  {
    id: 'ev-1',
    date: 'Dec 06, 2024',
    city: 'Portland, OR',
    venue: 'Moonflower Bookshop Loft',
    notes: 'Candlelit acoustic EP set + vinyl signing (All Ages)'
  },
  {
    id: 'ev-2',
    date: 'Dec 12, 2024',
    city: 'Seattle, WA',
    venue: 'Cedar & Steam Tea House',
    notes: 'Evening cassette listening circle & Q&A'
  },
  {
    id: 'ev-3',
    date: 'Dec 19, 2024',
    city: 'San Francisco, CA',
    venue: 'The Velvet Attic Listening Room',
    notes: 'Winter Solstice lullaby concert with felt piano'
  },
  {
    id: 'ev-4',
    date: 'Jan 11, 2025',
    city: 'Online Livestream',
    venue: 'Witchy Tunes Studio Attic',
    notes: 'Free cozy studio stream & songwriting mailbag'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Bookshop Listening Night',
    kind: 'fan',
    date: 'Oct 20, 2024',
    credit: 'Photo by Clara V.',
    caption: 'Warm paper lanterns and sixty quiet listeners seated among tall fiction shelves.',
    specs: '35mm Film · Kodak Portra 400',
    motif: 'candle-tour',
    accentBg: '#FFE3F1'
  },
  {
    id: 'gal-2',
    title: 'Test Pressing Unboxing',
    kind: 'fan',
    date: 'Oct 08, 2024',
    credit: 'Photo by Theo Moss',
    caption: 'First spin of the translucent lavender LP straight out of the mailer.',
    specs: '50mm f/1.8 · Natural Window Light',
    motif: 'lavender-vinyl',
    accentBg: '#EDE5FF'
  },
  {
    id: 'gal-3',
    title: 'Signed Lyric Zines & Tea',
    kind: 'fan',
    date: 'Sep 30, 2024',
    credit: 'Photo by Elena M.',
    caption: 'Fan table setup with pink zines, enamel pins, and chamomile sachets.',
    specs: '28mm · Indoor Candlelight',
    motif: 'potion-tea',
    accentBg: '#F4FBC1'
  },
  {
    id: 'gal-4',
    title: 'Spooky Lullaby Cover Study',
    kind: 'art',
    date: 'Nov 01, 2024',
    credit: 'Art by Mina Bell',
    caption: 'Original ink & digital pastel study for the EP center badge and mascot hat.',
    specs: 'Ink & Digital Pastel · 2400×2400',
    motif: 'witch-hat',
    accentBg: '#FFD6EC'
  },
  {
    id: 'gal-5',
    title: '1978 Music Box Blueprint',
    kind: 'art',
    date: 'Oct 15, 2024',
    credit: 'Art by Mina Bell',
    caption: 'Zine centerfold diagram mapping our tape echo and ribbon mic chain.',
    specs: '2-Color Risograph · Ink & Lime',
    motif: 'music-box',
    accentBg: '#F3FAC2'
  },
  {
    id: 'gal-6',
    title: 'Crescent Moon Cassette J-Card',
    kind: 'art',
    date: 'Sep 18, 2024',
    credit: 'Art by Mina Bell',
    caption: 'Fold-out artwork printed for the limited run of 200 Spooky Melodies tapes.',
    specs: 'Screenprint Study · Lavender & Plum',
    motif: 'crescent-moon',
    accentBg: '#E9DDFF'
  }
];

export const IMAGE_HOTSPOTS: ImageHotspot[] = [
  {
    id: 'header-brand',
    number: 1,
    title: 'Witchy Tunes Masthead',
    areaLabel: 'Header & Tagline',
    summary:
      'Set in warm plum display lettering flanked by twin four-point stars, the masthead anchors the three pillars of the project: Music, Magic, and Merch.',
    designDetail: 'Plum ink (#4A1D4D) on cream blush header strip with crisp hairline rule.',
    relatedPostId: 'post-4',
    targetRoute: 'homepage',
    bounds: { top: '0.6%', left: '3%', width: '42%', height: '7.5%' },
    shapeClass: 'rounded-xl'
  },
  {
    id: 'new-release-ep',
    number: 2,
    title: '"Spooky Lullaby" EP Badge',
    areaLabel: 'New Release Circle',
    summary:
      'This pastel lavender starburst circle announces our five-track EP recorded with a 1978 brass music box and half-speed tape echo.',
    designDetail: 'Dashed inner ring echoing vintage sticker-sheet badges and cassette hype labels.',
    relatedPostId: 'post-1',
    targetRoute: 'new-release',
    bounds: { top: '14.3%', left: '6.4%', width: '25.1%', height: '18.7%' },
    shapeClass: 'rounded-full'
  },
  {
    id: 'witch-mascot',
    number: 3,
    title: 'The Pink Witch Mascot',
    areaLabel: 'Center Character Art',
    summary:
      'Drawn in ink and cozy pastel tones, our yellow-cloaked witch wears a crescent-moon hat inspired by Mina’s late-night attic recording sessions.',
    designDetail: 'Hand-inked lineweight matching the surrounding heart-patterned wallpaper.',
    relatedPostId: 'post-4',
    targetRoute: 'bio',
    bounds: { top: '4%', left: '33%', width: '29%', height: '31.5%' },
    shapeClass: 'rounded-3xl'
  },
  {
    id: 'now-playing-mix',
    number: 4,
    title: 'Now Playing: Spooky Melodies Mix',
    areaLabel: 'Audio Mix Card',
    summary:
      'A 12-track instrumental cassette mix built for rainy reading afternoons, blending felt upright piano, Omnichord chords, and porch wind chimes.',
    designDetail: 'Framed pink note card with eighth-note accents and live tracklist launch.',
    relatedPostId: 'post-5',
    targetRoute: 'now-playing',
    bounds: { top: '14.4%', left: '64%', width: '29.6%', height: '17.4%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'welcome-banner',
    number: 5,
    title: 'Welcome to the Coven Banner',
    areaLabel: 'Editorial Intro Ribbon',
    summary:
      'The rounded welcome ribbon introduces Witchy Tunes as an inclusive, low-volume listening club centered around acoustic warmth and storybook art.',
    designDetail: 'Cream pill container bridging the upper illustration stage and navigation grid.',
    relatedPostId: 'post-3',
    targetRoute: 'about',
    bounds: { top: '37%', left: '11.4%', width: '77.2%', height: '4.8%' },
    shapeClass: 'rounded-full'
  },
  {
    id: 'btn-homepage',
    number: 6,
    title: 'Homepage Hub Button',
    areaLabel: 'Primary Nav · Row 1',
    summary:
      'Returns listeners to the Witchy Tunes front-page overview with featured dispatches, recent recordings, and quick links across the coven.',
    designDetail: 'High-contrast acid lime (#E9F53B) with solid ink border and drop shadow.',
    relatedPostId: 'post-4',
    targetRoute: 'homepage',
    bounds: { top: '45%', left: '6.7%', width: '29%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-about',
    number: 7,
    title: 'About Witchy Tunes',
    areaLabel: 'Primary Nav · Row 1',
    summary:
      'Explains how Witchy Tunes grew from bedroom four-track cassette experiments into small-batch vinyl pressings and candlelit bookshop concerts.',
    designDetail: 'Star-icon lime capsule pairing playful cartoon geometry with crisp legibility.',
    relatedPostId: 'post-3',
    targetRoute: 'about',
    bounds: { top: '45%', left: '38.7%', width: '25.8%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-blog',
    number: 8,
    title: 'The Coven Blog',
    areaLabel: 'Primary Nav · Row 1',
    summary:
      'Opens the full editorial journal—featuring songwriting essays, upright piano miking notes, tour diaries, audio demos, and reader comments.',
    designDetail: 'Notebook-and-pencil emblem signaling living studio diaries and liner notes.',
    relatedPostId: 'post-1',
    targetRoute: 'blog',
    bounds: { top: '45%', left: '67.6%', width: '25.8%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-find-us',
    number: 9,
    title: 'Find Us Here (Shows & Mail)',
    areaLabel: 'Events & Contact · Row 2',
    summary:
      'Lists upcoming intimate listening nights at independent bookstores and tea rooms, plus a direct studio mailbag for hello@witchytunes.com.',
    designDetail: 'Map-pin icon paired with wide tactile lime action button.',
    relatedPostId: 'post-3',
    targetRoute: 'find-us',
    bounds: { top: '55.8%', left: '6.7%', width: '41.5%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-bio',
    number: 10,
    title: 'Artist Bio & Studio Rig',
    areaLabel: 'Creator Profile · Row 2',
    summary:
      'Profiles multi-instrumentalist Mina Bell and details the physical instruments behind our recordings—from felt dampers to Suzuki Omnichords.',
    designDetail: 'Twin-sparkle emblem linking directly to gear notes and studio history.',
    relatedPostId: 'post-2',
    targetRoute: 'bio',
    bounds: { top: '55.8%', left: '53.3%', width: '40.1%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-shop',
    number: 11,
    title: 'Shop (Merch · Vinyl · Potions)',
    areaLabel: 'Storefront · Row 3',
    summary:
      'Showcases translucent lavender 12-inch vinyl, risograph lyric zines, pink witch enamel pins, and loose-leaf chamomile listening teas.',
    designDetail: 'Shopping tote icon with subtitle caption directly anchored underneath.',
    relatedPostId: 'post-6',
    targetRoute: 'shop',
    bounds: { top: '66.6%', left: '6.7%', width: '41.5%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-ai-songs',
    number: 12,
    title: 'AI Songs (Chord & Lyric Studio)',
    areaLabel: 'Interactive Tool · Row 3',
    summary:
      'An interactive songwriting spark generator where visitors pick a cozy mood and instrument to preview major-ninth chord progressions.',
    designDetail: 'Sparkle-wand icon inviting hands-on chord experimentation right in the browser.',
    relatedPostId: 'post-5',
    targetRoute: 'ai-songs',
    bounds: { top: '66.6%', left: '53.3%', width: '40.1%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-fan-photos',
    number: 13,
    title: 'Photos (Fan Photos • Events)',
    areaLabel: 'Community Gallery · Row 4',
    summary:
      'Captures 35mm film snapshots from bookshop listening circles, vinyl unboxing tables, and candlelit autumn tour stops.',
    designDetail: 'Camera icon highlighting community-contributed memories.',
    relatedPostId: 'post-3',
    targetRoute: 'fan-photos',
    bounds: { top: '81.4%', left: '6.7%', width: '41.5%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  },
  {
    id: 'btn-art-gallery',
    number: 14,
    title: 'Photos (Art • Album Gallery)',
    areaLabel: 'Visual Archive · Row 4',
    summary:
      'Archives original album sleeve studies, risograph gear blueprints, and cassette J-card illustrations in a clean lightbox gallery.',
    designDetail: 'Layered picture-frame icon showcasing Witchy Tunes visual design.',
    relatedPostId: 'post-6',
    targetRoute: 'art-gallery',
    bounds: { top: '81.4%', left: '53.3%', width: '40.1%', height: '7.5%' },
    shapeClass: 'rounded-2xl'
  }
];

