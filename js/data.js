/* =========================================================================
   MS OFFICE LAB QUEST — Content Data
   Invertis University Bareilly | Advanced MS Office Lab
   Syllabus: VOI001 — Introduction of MS-Office (B.Sc. Vocational)
   ========================================================================= */

const APP_META = {
  word:  { label: "MS Word",       color: "#2B6CB0", colorDark: "#5B9BE6", glyph: "W" },
  excel: { label: "MS Excel",      color: "#1E9E63", colorDark: "#3FCB8C", glyph: "X" },
  ppt:   { label: "MS PowerPoint", color: "#E2532B", colorDark: "#FF7B4D", glyph: "P" },
  netmail: { label: "Internet & Email", color: "#5C3D99", colorDark: "#A78BDA", glyph: "@" },
  access:  { label: "MS Access",       color: "#A4373A", colorDark: "#E28A8C", glyph: "A" }
};

/* Question type reference:
   mcq        { prompt, options[], correct(index), explain }
   truefalse  { prompt, correct(bool), explain }
   fill       { prompt, accepted[](lowercase strings, matched loosely), hint, explain }
   click      { prompt, ribbon(group label shown), options[], correct(index), explain }
*/

const SECTIONS = [
// ============================================================ 1
{
  id: "word-basics", app: "word",
  title: "Word Foundations",
  tagline: "Ribbon, typing & your first edits",
  subs: [
    { id:"w1-1", title:"Meet the Ribbon", type:"click",
      prompt:"You need to change the font, apply Bold and adjust paragraph spacing. Which Ribbon tab do you click first?",
      ribbon:"Ribbon Tabs",
      options:["File","Home","Insert","View"], correct:1,
      explain:"The Home tab holds the Font, Paragraph and Styles groups — your most-used formatting tools." },
    { id:"w1-2", title:"Aligning Text", type:"mcq",
      prompt:"Which keyboard shortcut centers the selected paragraph?",
      options:["Ctrl+L","Ctrl+E","Ctrl+R","Ctrl+J"], correct:1,
      explain:"Ctrl+E centers text. Ctrl+L, Ctrl+R and Ctrl+J are left, right and justify." },
    { id:"w1-3", title:"Cut, Copy & Paste", type:"mcq",
      prompt:"You want to duplicate a sentence elsewhere in the document without removing the original. Which pair of shortcuts do you use?",
      options:["Ctrl+X then Ctrl+V","Ctrl+C then Ctrl+V","Ctrl+C then Ctrl+P","Ctrl+A then Ctrl+X"], correct:1,
      explain:"Copy (Ctrl+C) keeps the original in place; Paste (Ctrl+V) places the duplicate. Cut (Ctrl+X) removes the original." },
    { id:"w1-4", title:"Select All & Clear", type:"truefalse",
      prompt:"True or False: 'Clear Formatting' (in the Font group) deletes the selected text, not just its formatting.",
      correct:false,
      explain:"Clear Formatting only strips bold/italic/color/styles — the text itself stays. Use Delete to remove text." },
    { id:"w1-5", title:"Find & Replace", type:"fill",
      prompt:"Type the keyboard shortcut that opens the Find & Replace dialog box directly on the Replace tab.",
      accepted:["ctrl+h","ctrl h"], hint:"Two keys — Ctrl and a letter.",
      explain:"Ctrl+H opens Replace directly. (Ctrl+F opens Find only.)" },
    { id:"w1-6", title:"Saving Your Work", type:"mcq",
      prompt:"You've already saved 'Assignment.docx' once, and now want to keep the original but also save a second copy named 'Assignment_Final.docx'. What do you use?",
      options:["Save","Save As","New","Close"], correct:1,
      explain:"Save As lets you create a new file (new name/location) while leaving the original untouched." },
    { id:"w1-7", title:"New, Open & Close", type:"mcq",
      prompt:"Which command starts a brand-new blank document?",
      options:["Open","New","Save As","Print"], correct:1,
      explain:"New (Ctrl+N) creates a fresh blank document from a template or blank canvas." }
  ]
},

// ============================================================ 2
{
  id: "word-formatting", app: "word",
  title: "Fonts, Paragraphs & Styles",
  tagline: "Make it look the way it should",
  subs: [
    { id:"w2-1", title:"Bold, Italic, Underline", type:"mcq",
      prompt:"Which shortcut applies Italic formatting?",
      options:["Ctrl+B","Ctrl+I","Ctrl+U","Ctrl+T"], correct:1,
      explain:"Ctrl+I = Italic, Ctrl+B = Bold, Ctrl+U = Underline." },
    { id:"w2-2", title:"The Font Group", type:"click",
      prompt:"You want to change font size and font colour together. Which Home-tab group do you open?",
      ribbon:"Home Tab Groups",
      options:["Paragraph","Font","Styles","Editing"], correct:1,
      explain:"Font Size, Font Color, Bold/Italic/Underline and Text Case all live in the Font group." },
    { id:"w2-3", title:"Line & Paragraph Spacing", type:"mcq",
      prompt:"To increase the space between lines inside a paragraph, which command do you use?",
      options:["Line and Paragraph Spacing (Home > Paragraph)","Page Margins (Layout)","Text Wrap (Insert)","Column Break"], correct:0,
      explain:"Line and Paragraph Spacing in the Paragraph group controls line height and space before/after paragraphs." },
    { id:"w2-4", title:"Tabs & Indents", type:"truefalse",
      prompt:"True or False: The horizontal ruler lets you drag markers to set First Line Indent and Hanging Indent.",
      correct:true,
      explain:"The top ruler shows draggable indent markers — First Line, Hanging, and Left/Right indent." },
    { id:"w2-5", title:"Built-in Styles", type:"mcq",
      prompt:"Where do you find the gallery of built-in styles like 'Heading 1' and 'Title'?",
      options:["Home tab > Styles group","Insert tab > Text group","Review tab","File tab"], correct:0,
      explain:"The Styles gallery sits on the Home tab, letting you apply and modify Heading/Title/Normal styles instantly." },
    { id:"w2-6", title:"Table of Contents", type:"mcq",
      prompt:"A Table of Contents automatically updates its page numbers only if the headings were formatted using...",
      options:["Bold text","Built-in Heading styles","Text boxes","WordArt"], correct:1,
      explain:"Word scans documents for Heading styles (Heading 1, 2, 3...) to auto-build and refresh a Table of Contents." },
    { id:"w2-7", title:"Footnote vs Endnote", type:"mcq",
      prompt:"A citation note that must appear at the very end of the whole document (not the bottom of the page) should be inserted as a:",
      options:["Footnote","Endnote","Text Box","Comment"], correct:1,
      explain:"Footnotes sit at the bottom of the same page; Endnotes collect at the end of the document." }
  ]
},

// ============================================================ 3
{
  id: "word-lists-objects", app: "word",
  title: "Lists, Graphics & Tables",
  tagline: "Bullets, pictures, and building tables",
  subs: [
    { id:"w3-1", title:"Bullets vs Numbering", type:"mcq",
      prompt:"You are listing 5 sequential installation steps that must be followed in order. Which list type fits best?",
      options:["Bulleted list","Numbered list","Multilevel list with letters only","No list — plain paragraphs"], correct:1,
      explain:"Numbered lists show sequence/order; bullets are for unordered items of equal weight." },
    { id:"w3-2", title:"Multilevel Lists", type:"click",
      prompt:"Which button creates a nested outline like '1. → a. → i.' across multiple indent levels?",
      ribbon:"Paragraph Group",
      options:["Bullets","Numbering","Multilevel List","Sort"], correct:2,
      explain:"Multilevel List builds outline-style nested numbering across several indent levels at once." },
    { id:"w3-3", title:"Inserting Pictures & SmartArt", type:"mcq",
      prompt:"To insert a picture, clipart, SmartArt diagram, or WordArt into your document, which Ribbon tab do you use?",
      options:["Home","Insert","Layout","References"], correct:1,
      explain:"The Insert tab houses Pictures, Shapes, SmartArt, WordArt, Charts, Tables and more." },
    { id:"w3-4", title:"WordArt & Text Boxes", type:"truefalse",
      prompt:"True or False: A Text Box can be moved freely around the page, independent of the normal paragraph flow.",
      correct:true,
      explain:"Text boxes float above the text layer, so you can drag and position them anywhere on the page." },
    { id:"w3-5", title:"Inserting a Table", type:"fill",
      prompt:"Complete the menu path: to insert a table you go to the ____ tab, then click Table.",
      accepted:["insert"], hint:"Same tab used for pictures and shapes.",
      explain:"Insert > Table lets you choose the number of rows and columns, or draw a custom table." },
    { id:"w3-6", title:"Merge & Split Cells", type:"mcq",
      prompt:"You have a table and want one wide cell across the top row as a heading. What do you do to the top-row cells?",
      options:["Split Cells","Merge Cells","Delete Cells","Distribute Columns"], correct:1,
      explain:"Merge Cells combines multiple selected cells into one — perfect for a heading row." },
    { id:"w3-7", title:"Borders & Shading", type:"click",
      prompt:"You want to add a decorative border around the entire page. Which tab holds 'Page Borders'?",
      ribbon:"Ribbon Tabs",
      options:["Design","Home","View","Mailings"], correct:0,
      explain:"Design tab (or Layout in some versions) contains Page Borders and Page Color for whole-page decoration." }
  ]
},

// ============================================================ 4
{
  id: "word-advanced", app: "word",
  title: "Headers, Mail Merge & Proofing",
  tagline: "Finish, merge and print like a pro",
  subs: [
    { id:"w4-1", title:"Headers & Footers", type:"mcq",
      prompt:"Which tab lets you insert a custom Header or Footer (with page numbers, date, or a logo)?",
      options:["Insert","References","Review","Mailings"], correct:0,
      explain:"Insert > Header & Footer gives you built-in designs plus the option to add objects like a logo." },
    { id:"w4-2", title:"Section Breaks", type:"truefalse",
      prompt:"True or False: You must add a Section Break if you want different headers/footers on different parts of the same document.",
      correct:true,
      explain:"Section breaks let each section have its own header/footer, margins, or page orientation." },
    { id:"w4-3", title:"Mail Merge — Correct Order", type:"mcq",
      prompt:"Which sequence correctly describes a Mail Merge?",
      options:[
        "Preview results → Select recipients → Write letter → Finish & Merge",
        "Start Mail Merge → Select recipients (address list) → Insert merge fields → Preview → Finish & Merge",
        "Finish & Merge → Insert fields → Start Mail Merge",
        "Insert fields → Print → Select recipients"],
      correct:1,
      explain:"The Mail Merge Wizard flows: start the merge, choose/import the address list, insert fields, preview, then finish." },
    { id:"w4-4", title:"Mail Merge Data Source", type:"mcq",
      prompt:"For a Mail Merge, your recipient address list can be imported directly from which file type?",
      options:["An Excel workbook","A PowerPoint slide","An image file","An audio file"], correct:0,
      explain:"Word can import an address list from an Excel file, Outlook contacts, or type a new list." },
    { id:"w4-5", title:"Spelling & Grammar", type:"fill",
      prompt:"Type the function key that launches the Spelling & Grammar check.",
      accepted:["f7"], hint:"It's a function key at the top of the keyboard.",
      explain:"Pressing F7 opens the Spelling & Grammar pane to review the whole document." },
    { id:"w4-6", title:"AutoCorrect Options", type:"mcq",
      prompt:"AutoCorrect is most useful for:",
      options:["Automatically fixing common typing mistakes as you type","Formatting page margins","Creating mail merge fields","Inserting page numbers"], correct:0,
      explain:"AutoCorrect silently fixes common typos (like 'teh' → 'the') as you type." },
    { id:"w4-7", title:"Page Setup for Printing", type:"mcq",
      prompt:"Before printing, you want to change the top/bottom/left/right margins. Where do you go?",
      options:["Layout tab > Margins","View tab > Zoom","Home tab > Font","References tab"], correct:0,
      explain:"Layout (Page Setup) > Margins lets you set or customize page margins before Print Preview." }
  ]
},

// ============================================================ 5
{
  id: "excel-basics", app: "excel",
  title: "Excel Foundations",
  tagline: "Rows, columns & your first worksheet",
  subs: [
    { id:"x1-1", title:"Rows, Columns & Cells", type:"mcq",
      prompt:"A single cell reference like 'C5' means:",
      options:["Row C, Column 5","Column C, Row 5","Sheet C, Cell 5","Cell number 5 on Sheet C"], correct:1,
      explain:"Cell references read Column-then-Row: C5 = Column C, Row 5." },
    { id:"x1-2", title:"Jumping to A1", type:"fill",
      prompt:"Type the keyboard shortcut that instantly jumps the cursor back to cell A1.",
      accepted:["ctrl+home","ctrl home"], hint:"Ctrl + a navigation key.",
      explain:"Ctrl+Home returns you to cell A1 from anywhere in the worksheet." },
    { id:"x1-3", title:"Entering Data & AutoFill", type:"mcq",
      prompt:"You typed 'Monday' in A1 and want Tuesday, Wednesday... to fill automatically in the cells below. What do you drag?",
      options:["The Name Box","The Fill Handle (small square at the cell's corner)","The Formula Bar","The Sheet Tab"], correct:1,
      explain:"Dragging the Fill Handle extends smart series like days, months, or numbers automatically." },
    { id:"x1-4", title:"Formatting Numbers", type:"mcq",
      prompt:"To display a value like 25000 as currency (₹25,000.00), you apply which format?",
      options:["Currency/Accounting Number Format","Text Format","General Format","Percentage Format"], correct:0,
      explain:"The Currency/Accounting format (Home > Number group) adds the symbol, commas and decimals." },
    { id:"x1-5", title:"Wrap Text & Merge Center", type:"click",
      prompt:"You want a long heading to wrap onto two lines inside one cell, and also merge A1:D1 into a single centered title cell. Which Home-tab group has both tools?",
      ribbon:"Home Tab Groups",
      options:["Alignment","Number","Font","Cells"], correct:0,
      explain:"Wrap Text and Merge & Center both live in the Alignment group on the Home tab." },
    { id:"x1-6", title:"Freezing Panes", type:"mcq",
      prompt:"You have a huge worksheet and want the header row to stay visible while scrolling down. Which feature do you use?",
      options:["Freeze Panes (View tab)","Sort & Filter","Conditional Formatting","Page Break Preview"], correct:0,
      explain:"View > Freeze Panes locks chosen rows/columns in place while the rest of the sheet scrolls." },
    { id:"x1-7", title:"Undo & Redo", type:"fill",
      prompt:"Type the shortcut to REDO an action you just undid (the standard Windows shortcut).",
      accepted:["ctrl+y","ctrl y"], hint:"Ctrl and a letter near Z.",
      explain:"Ctrl+Z undoes, Ctrl+Y redoes the last undone action." }
  ]
},

// ============================================================ 6
{
  id: "excel-formulas", app: "excel",
  title: "Formulas & Functions",
  tagline: "Make the spreadsheet calculate for you",
  subs: [
    { id:"x2-1", title:"Writing Your First Formula", type:"fill",
      prompt:"Write a formula that adds the values in cells A1 and B1 together.",
      accepted:["=a1+b1","=b1+a1"], hint:"Every formula starts with an equals sign.",
      explain:"=A1+B1 adds the two cell values. Every Excel formula must begin with '='." },
    { id:"x2-2", title:"Relative vs Absolute References", type:"mcq",
      prompt:"You want a reference to cell B2 to stay fixed (not change) when you copy the formula to other cells. How do you write it?",
      options:["B2","$B$2","B$2 only","2B"], correct:1,
      explain:"Dollar signs ($B$2) lock both the column and row so the reference doesn't shift when copied — an absolute reference." },
    { id:"x2-3", title:"The SUM Function", type:"fill",
      prompt:"Write a formula using the SUM function to total the range A1 to A10.",
      accepted:["=sum(a1:a10)"], hint:"Function name, then the range in parentheses with a colon.",
      explain:"=SUM(A1:A10) adds every value in that cell range." },
    { id:"x2-4", title:"SUMIF & COUNTIF", type:"mcq",
      prompt:"You want to count how many cells in range A1:A20 contain the text 'Pass'. Which function fits?",
      options:["SUM(A1:A20)","COUNTIF(A1:A20,\"Pass\")","AVERAGE(A1:A20)","VLOOKUP(A1:A20)"], correct:1,
      explain:"COUNTIF(range, criteria) counts cells matching a specific condition, like the text 'Pass'." },
    { id:"x2-5", title:"VLOOKUP Basics", type:"mcq",
      prompt:"VLOOKUP is mainly used to:",
      options:["Sort a column alphabetically","Search for a value in the first column of a range and return a value from another column in the same row","Format cells with colors","Insert a chart"], correct:1,
      explain:"VLOOKUP looks up a value vertically (in the leftmost column) and returns a related value from that row." },
    { id:"x2-6", title:"Date Functions", type:"fill",
      prompt:"Which function returns today's date automatically, and updates every time the sheet recalculates? (Write it with parentheses.)",
      accepted:["=today()","today()"], hint:"A short function name, all caps, no arguments.",
      explain:"=TODAY() always shows the current date and refreshes automatically." },
    { id:"x2-7", title:"Text Functions", type:"mcq",
      prompt:"To join the text in A1 and B1 into one cell (e.g. First name + Last name), which function/operator works?",
      options:["SUM or +","CONCAT or the & operator","AVERAGE","COUNTIF"], correct:1,
      explain:"CONCAT(A1,B1) or the formula =A1&B1 joins text from multiple cells together." }
  ]
},

// ============================================================ 7
{
  id: "excel-data-tools", app: "excel",
  title: "Sorting, Charts & PivotTables",
  tagline: "Turn raw data into insight",
  subs: [
    { id:"x3-1", title:"Sort Ascending/Descending", type:"mcq",
      prompt:"You want to arrange a list of student names alphabetically from A to Z. Which sort order do you choose?",
      options:["Descending","Ascending","Custom List","Filter by Color"], correct:1,
      explain:"Ascending order arranges text A→Z and numbers smallest→largest." },
    { id:"x3-2", title:"Number Filter vs Text Filter", type:"mcq",
      prompt:"To show only rows where Marks are 'Greater Than 60', which filter type do you use?",
      options:["Text Filter","Number Filter","Date Filter","Color Filter"], correct:1,
      explain:"Number Filters offer comparisons like Greater Than, Less Than, and Between for numeric columns." },
    { id:"x3-3", title:"Conditional Formatting", type:"truefalse",
      prompt:"True or False: Conditional Formatting can automatically highlight cells in red if a value falls below a set threshold.",
      correct:true,
      explain:"Conditional Formatting applies rule-based formatting (colors, icons, data bars) based on cell values." },
    { id:"x3-4", title:"Inserting a Chart", type:"click",
      prompt:"You've selected your data range and want to insert a Column or Pie chart. Which Ribbon tab do you click?",
      ribbon:"Ribbon Tabs",
      options:["Home","Insert","Data","Formulas"], correct:1,
      explain:"Insert tab > Charts group holds Column, Bar, Pie, Line and other chart types." },
    { id:"x3-5", title:"Chart Elements", type:"mcq",
      prompt:"Which chart element explains what each color/series in the chart represents?",
      options:["Chart Title","Legend","Data Labels","Gridlines"], correct:1,
      explain:"The Legend maps colors/patterns in the chart to the series or category names." },
    { id:"x3-6", title:"PivotTables", type:"mcq",
      prompt:"A PivotTable is best used to:",
      options:["Add a border around cells","Summarize and cross-tabulate large amounts of data quickly","Check spelling","Insert a picture"], correct:1,
      explain:"PivotTables let you summarize, group and reorganize large datasets interactively without new formulas." },
    { id:"x3-7", title:"Print Area & Titles", type:"mcq",
      prompt:"You only want to print a specific block of cells, not the whole worksheet. Which feature do you set?",
      options:["Print Area (Page Layout tab)","Freeze Panes","AutoFilter","Data Validation"], correct:0,
      explain:"Page Layout > Print Area lets you select exactly which cells get printed." }
  ]
},

// ============================================================ 8
{
  id: "ppt-basics", app: "ppt",
  title: "PowerPoint Foundations",
  tagline: "Slides, layouts and themes",
  subs: [
    { id:"p1-1", title:"New, Save & Save As", type:"mcq",
      prompt:"You've been editing 'Seminar.pptx' and want to keep the original file untouched while saving your edited version under a new name. What do you use?",
      options:["Save","Save As","Close","New"], correct:1,
      explain:"Save As creates a separate copy with a new name/location, leaving the original file as it was." },
    { id:"p1-2", title:"Slide Layouts", type:"mcq",
      prompt:"You want a slide with a big title and a bulleted content area below it. Which layout best fits?",
      options:["Blank","Title and Content","Two Content","Section Header"], correct:1,
      explain:"'Title and Content' provides a title placeholder plus a content/bullet-list placeholder." },
    { id:"p1-3", title:"Applying Themes", type:"click",
      prompt:"Which Ribbon tab lets you apply a ready-made Theme (colors, fonts, effects) to your whole presentation?",
      ribbon:"Ribbon Tabs",
      options:["Design","Home","Slide Show","Review"], correct:0,
      explain:"The Design tab holds the Themes gallery plus Variants for color schemes." },
    { id:"p1-4", title:"Slide Views", type:"mcq",
      prompt:"Which view shows small thumbnails of all your slides at once — great for rearranging their order?",
      options:["Normal View","Slide Sorter View","Reading View","Notes Page View"], correct:1,
      explain:"Slide Sorter View displays all slides as thumbnails so you can drag to reorder them easily." },
    { id:"p1-5", title:"Bullets in Slides", type:"truefalse",
      prompt:"True or False: You can apply multilevel bullet/number formatting inside a PowerPoint content placeholder, just like in Word.",
      correct:true,
      explain:"Content placeholders support multilevel bullets and numbering with the Tab key to demote levels." },
    { id:"p1-6", title:"Duplicating Slides", type:"mcq",
      prompt:"You want an exact copy of Slide 3 to use as a starting point for Slide 4. What's the quickest way?",
      options:["Right-click Slide 3 thumbnail > Duplicate Slide","Delete Slide 3","Insert a new blank slide and retype everything","Use Find & Replace"], correct:0,
      explain:"Duplicate Slide instantly creates an identical copy right after the original." },
    { id:"p1-7", title:"Slide Background", type:"mcq",
      prompt:"To change just the background color/image/pattern of the current slide, you use:",
      options:["Format Background (Design tab)","Insert > Header & Footer","Animations tab","Slide Show > Set Up"], correct:0,
      explain:"Format Background lets you set a solid color, gradient, texture or picture fill for the slide." }
  ]
},

// ============================================================ 9
{
  id: "ppt-objects-media", app: "ppt",
  title: "Objects, Media & SmartArt",
  tagline: "Shapes, links, sound & video",
  subs: [
    { id:"p2-1", title:"Inserting Shapes & Pictures", type:"click",
      prompt:"Which Ribbon tab do you use to insert Shapes, Clip Art/Pictures, SmartArt, and Charts into a slide?",
      ribbon:"Ribbon Tabs",
      options:["Insert","View","Transitions","Slide Show"], correct:0,
      explain:"Insert tab covers Pictures, Shapes, SmartArt, Charts, Tables, Audio and Video — all your slide media." },
    { id:"p2-2", title:"SmartArt vs WordArt", type:"mcq",
      prompt:"You want to convert a bulleted list of 5 process steps into a visual flow diagram. Which feature helps?",
      options:["WordArt","Convert to SmartArt","Font Color","Slide Transition"], correct:1,
      explain:"'Convert to SmartArt' turns plain bullet text into diagrams like process flows, cycles, or hierarchies." },
    { id:"p2-3", title:"Hyperlinks & Action Buttons", type:"mcq",
      prompt:"You want clicking a shape to jump straight to Slide 10. What do you add to that shape?",
      options:["A Hyperlink / Action","A new Theme","A Text Box","A Chart"], correct:0,
      explain:"Insert > Link (Hyperlink) or Action Buttons let a click jump to another slide, file, or URL." },
    { id:"p2-4", title:"Inserting Audio", type:"truefalse",
      prompt:"True or False: You can insert an audio file to play automatically or only-on-click during a slide show.",
      correct:true,
      explain:"Audio playback options (Automatically / On Click) are set in the Playback tab after inserting audio." },
    { id:"p2-5", title:"Inserting Video", type:"mcq",
      prompt:"Which tab appears after you insert a video, letting you trim it and adjust playback/fade options?",
      options:["Playback tab (under Video Tools)","References tab","Mailings tab","Review tab"], correct:0,
      explain:"Video Tools > Playback offers Trim Video, Fade In/Out, Volume and Start options." },
    { id:"p2-6", title:"Tables in PowerPoint", type:"mcq",
      prompt:"To merge two adjacent cells in a slide's table into one, you use:",
      options:["Merge Cells (Table Tools > Layout)","Format Background","Slide Master","Animation Pane"], correct:0,
      explain:"Table Tools > Layout has Merge Cells and Split Cells, same concept as in Word." },
    { id:"p2-7", title:"Header & Footer on Slides", type:"mcq",
      prompt:"To add slide numbers and a footer date across all slides at once, which command do you use?",
      options:["Insert > Header & Footer","Design > Themes","Animations > Add Animation","Review > Spelling"], correct:0,
      explain:"Insert > Header & Footer lets you apply date, slide number, and footer text to all slides together." }
  ]
},

// ============================================================ 10
{
  id: "ppt-animation-delivery", app: "ppt",
  title: "Animation, Transitions & Delivery",
  tagline: "Bring it to life and present it",
  subs: [
    { id:"p3-1", title:"Animations vs Transitions", type:"mcq",
      prompt:"An 'Entrance' animation like Fly In applied to a bullet point is an example of:",
      options:["A Slide Transition (between slides)","An Animation (applied to an object within a slide)","A Theme","A Layout"], correct:1,
      explain:"Animations act on objects within a slide (text, shapes). Transitions act on movement between two slides." },
    { id:"p3-2", title:"Slide Transitions", type:"click",
      prompt:"Which Ribbon tab do you use to apply a 'Fade' or 'Push' effect between slides?",
      ribbon:"Ribbon Tabs",
      options:["Transitions","Animations","Insert","Design"], correct:0,
      explain:"The Transitions tab controls how one slide changes to the next during the slide show." },
    { id:"p3-3", title:"Animation Order & Timing", type:"mcq",
      prompt:"You have 3 animated bullet points but they play in the wrong order. Where do you fix the sequence?",
      options:["Animation Pane (reorder items)","Slide Sorter View","Format Background","Table Tools"], correct:0,
      explain:"The Animation Pane lists every animation in order — drag items to reorder, and set timing/duration there." },
    { id:"p3-4", title:"Starting the Slide Show", type:"fill",
      prompt:"Type the function key that starts the slide show from the very FIRST slide.",
      accepted:["f5"], hint:"A function key at the top of the keyboard.",
      explain:"F5 starts from Slide 1. Shift+F5 starts from the current slide instead." },
    { id:"p3-5", title:"Custom Slide Show", type:"mcq",
      prompt:"You want to present only Slides 1, 3 and 7 to one audience, while keeping all slides in the file for others. What do you set up?",
      options:["Custom Slide Show","Rehearse Timings","Hyperlink","New Theme"], correct:0,
      explain:"Custom Slide Show lets you build a named subset of slides to present, without deleting any slides." },
    { id:"p3-6", title:"Saving as Video/Show", type:"mcq",
      prompt:"To share your presentation as a file that auto-plays like a video, without needing PowerPoint's edit view, you Save As:",
      options:["A .pptx Presentation","A PowerPoint Show (.ppsx) or Video (.mp4)","A .txt file","A .xlsx file"], correct:1,
      explain:"Saving as a PowerPoint Show (.ppsx) or exporting as Video (.mp4) lets it play directly without opening in edit mode." },
    { id:"p3-7", title:"Proofing & Print Preview", type:"mcq",
      prompt:"Before printing handouts of your slides, where do you check spelling and preview the print layout?",
      options:["Review tab (Spelling) and File > Print (Preview)","Insert tab","Animations tab","Slide Show > Set Up Show"], correct:0,
      explain:"Review > Spelling checks text; File > Print shows a live preview with handout layout options." }
  ]
},

{
  id: "word-challenge", app: "word",
  title: "Word Challenge",
  tagline: "Advanced, exam-toughness document tasks",
  subs: [
    { id:"wc-1", title:"Mail Merge — Insert Merge Field", type:"sim",
      prompt:"You have a Word letter and an Excel list of recipients. You need to place the recipient's first name wherever it should appear in the letter body. What do you do?",
      setup: MOCK.wordDoc("Invitation.docx",
        [{label:"Start Mail Merge", icons:["✉️","▤"]},{label:"Write & Insert Fields", icons:["«»","¶"]},{label:"Finish", icons:["✔"]}],
        "Mailings",
        "<h5>Annual Alumni Meet</h5><p>Dear ___________,</p><p>We are delighted to invite you to this year's alumni gathering on 12 October.</p>"),
      options:["Mailings > Insert Merge Field > First_Name","Insert > Quick Parts > Field","Mailings > Highlight Merge Fields","Insert > Cross-reference"],
      correct:0,
      afterHTML: "<div class='mock-page'><h5>Annual Alumni Meet</h5><p>Dear «First_Name»,</p><p>We are delighted to invite you to this year's alumni gathering on 12 October.</p></div>" + MOCK.callout("Merge field inserted — will pull a name per recipient row."),
      explain:"Mailings > Insert Merge Field places a placeholder («First_Name») that Word fills in individually for every row of the connected data source when you Finish & Merge." },

    { id:"wc-2", title:"Auto-Generated Table of Contents", type:"sim",
      prompt:"Your report already uses Heading 1 / Heading 2 styles throughout. You need a Table of Contents that updates automatically as headings change. Where do you build it?",
      setup: MOCK.wordDoc("Thesis.docx",
        [{label:"Table of Contents", icons:["≡"]},{label:"Captions", icons:["🏷️"]},{label:"Index", icons:["🔎"]}],
        "References",
        "<h5>Chapter 1 — Introduction</h5><p style='color:#888'>(cursor here, blank page for ToC)</p>"),
      options:["Insert > Object > Text from File","References > Table of Contents > Automatic Table","References > Table of Figures","Home > Multilevel List"],
      correct:1,
      afterHTML: "<div class='mock-page'><h5>Contents</h5>" +
        ["1. Introduction .......... 1","2. Literature Review .......... 4","3. Methodology .......... 12","4. Results & Discussion .......... 21"]
          .map((t,i)=>`<p style='margin:0 0 6px;animation:rowIn .4s ease both;animation-delay:${i*120}ms;'>${t}</p>`).join("") +
        "</div>" + MOCK.callout("Table of Contents generated from your Heading styles."),
      explain:"References > Table of Contents scans the document for Heading-styled text and builds a linked, page-numbered list — right-click it and choose Update Field any time headings change." },

    { id:"wc-3", title:"Track Changes — Accept All", type:"sim",
      prompt:"A colleague reviewed your draft with Track Changes on. You've read every suggestion and want a clean final copy with every edit applied. What do you click?",
      setup: MOCK.wordDoc("Draft_v3.docx",
        [{label:"Tracking", icons:["✏️"]},{label:"Changes", icons:["✔","✘"]},{label:"Compare", icons:["⇄"]}],
        "Review",
        "<h5>Executive Summary</h5><p>The <span class='mock-hl'>quarterly results</span> show <span style='color:#c0392b;text-decoration:underline;'>strong</span> growth across all regions.</p>"),
      options:["Review > Compare","Review > Track Changes > Lock Tracking","Review > Accept > Accept All Changes","Review > Simple Markup (display mode)"],
      correct:2,
      afterHTML: "<div class='mock-page'><h5>Executive Summary</h5><p>The quarterly results show strong growth across all regions.</p></div>" + MOCK.callout("All 6 tracked edits accepted — document is now clean."),
      explain:"Accept All Changes (Review > Changes) permanently applies every tracked insertion/deletion. Simply turning Track Changes off would stop recording new edits but leave the old markup in place." },

    { id:"wc-4", title:"Section Breaks for Different Headers", type:"sim",
      prompt:"Chapter 1 needs 'DRAFT' in its header, but Chapter 2 onward should have no header at all. A single Page Break won't let headers differ. What do you insert at the end of Chapter 1?",
      setup: MOCK.wordDoc("Manual.docx",
        [{label:"Page Setup", icons:["▤"]},{label:"Breaks", icons:["⏎"]},{label:"Section", icons:["§"]}],
        "Layout",
        "<p style='color:#888;font-size:11px;'>Header: DRAFT</p><h5>Chapter 1 — Overview</h5><p>...end of chapter text.<span class='mock-cursorline'></span></p>"),
      options:["Insert > Page Break","Layout > Breaks > Continuous","Layout > Margins > Custom Margins","Layout > Breaks > Section Break (Next Page)"],
      correct:3,
      afterHTML: "<div class='mock-page'><p style='color:#888;font-size:11px;'>Header: DRAFT</p><h5>Chapter 1 — Overview</h5><p>...end of chapter text.</p><hr style='border:none;border-top:2px dotted #999;margin:14px 0;'/><p style='font-size:10.5px;color:#999;'>Section Break (Next Page)</p><h5>Chapter 2 — Details</h5><p style='color:#888;font-size:11px;'>Header: (none — unlinked from previous)</p></div>" + MOCK.callout("Section break inserted — headers can now differ per section."),
      explain:"A Section Break (Next Page) creates an independent header/footer zone. After breaking the section, click 'Link to Previous' off in the Header & Footer tools so Chapter 2's header can be set independently." },

    { id:"wc-5", title:"Cross-Referencing a Figure", type:"sim",
      prompt:"Your report has 'Figure 3: Revenue Trend' as a caption. In the text you want to write '...as shown in Figure 3' so the number updates automatically if figures get reordered. What do you use?",
      setup: MOCK.wordDoc("Report.docx",
        [{label:"Links", icons:["🔗"]},{label:"Captions", icons:["🏷️"]}],
        "Insert",
        "<p>Regional performance improved steadily, as shown in ___________.</p><p style='font-size:11px;color:#555;'>Figure 3: Revenue Trend</p>"),
      options:["Insert > Cross-reference > Figure","Insert > Caption","References > Mark Citation","Insert > Bookmark, then hyperlink to it manually"],
      correct:0,
      afterHTML: "<div class='mock-page'><p>Regional performance improved steadily, as shown in <span style='color:#185abc;text-decoration:underline;'>Figure 3</span>.</p><p style='font-size:11px;color:#555;'>Figure 3: Revenue Trend</p></div>" + MOCK.callout("Cross-reference inserted — updates automatically if Figure 3 becomes Figure 2."),
      explain:"Insert > Cross-reference links directly to the caption's auto-number, so renumbering after inserting/deleting figures updates every reference with a single Update Fields (Ctrl+A, F9)." },

    { id:"wc-6", title:"Consistent Headings via Styles", type:"sim",
      prompt:"You manually bolded and enlarged three section titles by eye — they look almost, but not exactly, alike, and won't appear in a Table of Contents. What's the correct fix?",
      setup: MOCK.wordDoc("Notes.docx",
        [{label:"Styles", icons:["Aa","Aa"]},{label:"Font", icons:["B","I"]}],
        "Home",
        "<p style='font-weight:700;font-size:15px;'>1. introduction</p><p style='font-weight:700;font-size:14px;'>2. Method</p><p>Body text continues normally here…</p>"),
      options:["Use Format Painter to copy formatting between titles","Select each title and apply the Heading 1 style from the Styles gallery","Increase font size and bold manually to match","Use Text Effects > WordArt for consistency"],
      correct:1,
      afterHTML: "<div class='mock-page'><p style='font-weight:800;font-size:17px;color:#185abc;border-bottom:1px solid #185abc;'>1. Introduction</p><p style='font-weight:800;font-size:17px;color:#185abc;border-bottom:1px solid #185abc;'>2. Method</p><p>Body text continues normally here…</p></div>" + MOCK.callout("Heading 1 style applied — titles are now consistent and ToC-ready."),
      explain:"Built-in Heading styles guarantee identical formatting everywhere and — unlike manual bold/size — are what Table of Contents, Navigation Pane and cross-references all scan for." },

    { id:"wc-7", title:"Recording a Macro", type:"sim",
      prompt:"You repeat the same 5-step formatting routine (font, spacing, borders) on every new report. You want to record it once and replay it with one click. Where do you start?",
      setup: MOCK.wordDoc("Normal.dotm",
        [{label:"Code", icons:["{ }"]},{label:"Macros", icons:["⏺"]}],
        "View",
        "<p style='color:#888;'>Blank document — ready to record a formatting routine.</p>"),
      options:["Insert > Object > Package","Review > Restrict Editing > Formatting Restrictions","View > Macros > Record Macro","File > Options > Add-ins"],
      correct:2,
      afterHTML: "<div class='mock-page'><p><span style='background:#c0392b;color:#fff;border-radius:10px;padding:2px 8px;font-size:11px;'>⏺ Recording: Macro1</span></p><p style='margin-top:10px;color:#555;'>Every click and keystroke is now being captured…</p></div>" + MOCK.callout("Macro recording started — stop recording, then run it anytime with Ctrl+Shift+K."),
      explain:"View > Macros > Record Macro captures your exact steps as reusable VBA code — perfect for repetitive, multi-step formatting you do on every document." }
  ]
},
{
  id: "ppt-challenge", app: "ppt",
  title: "PowerPoint Challenge",
  tagline: "Advanced deck-building & delivery tasks",
  subs: [
    { id:"pc-1", title:"Slide Master — Brand Every Slide at Once", type:"sim",
      prompt:"Marketing changed the company font and logo. You need every slide in a 40-slide deck to update together, not one at a time. Where do you make the change?",
      setup: MOCK.pptSlide("Investor_Deck.pptx",
        [{label:"Master Views", icons:["▦"]},{label:"Close", icons:["✕"]}],
        "View",
        "<div class='s-title'>Q3 Roadmap</div><div class='s-body'><div class='s-bullet'>Old font: Calibri</div><div class='s-bullet'>Old logo placeholder</div></div>",
        "<div class='mock-thumbstrip'><div class='th active'></div><div class='th'></div><div class='th'></div><div class='th'></div></div>"),
      options:["Design > Themes (pick a different random theme)","Insert > Header & Footer, then update text on each slide","Format Background > Apply to All","View > Slide Master (edit once, applies to all slides)"],
      correct:3,
      afterHTML: "<div class='mock-slide enter'><div class='s-title' style='font-family:Georgia,serif;'>Q3 Roadmap</div><div class='s-body'><div class='s-bullet'>New font: Georgia — applied deck-wide</div><div class='s-bullet'>New logo now on every slide</div></div><div class='s-img'></div></div>" + MOCK.callout("Slide Master updated — all 40 slides now match."),
      explain:"The Slide Master defines fonts, colours, logo placeholders and layouts for the whole deck. Edit it once under View > Master Views > Slide Master, and every linked layout updates instantly." },

    { id:"pc-2", title:"Animation Pane — Fixing the Order", type:"sim",
      prompt:"Three bullet points animate in, but point 3 fires before point 1 because of the order you added them. Where do you reorder and retime the animations?",
      setup: MOCK.pptSlide("Pitch.pptx",
        [{label:"Advanced Animation", icons:["▤"]},{label:"Timing", icons:["⏱️"]}],
        "Animations",
        "<div class='s-title'>Why Choose Us</div><div class='s-body'><div class='s-bullet'>③ Proven track record</div><div class='s-bullet'>① 24/7 support</div><div class='s-bullet'>② Lowest total cost</div></div>"),
      options:["Animations > Animation Pane (drag to reorder, set timing)","Animations > Add Animation again in the order you want","Slide Show > Set Up Slide Show","Transitions > Effect Options"],
      correct:0,
      afterHTML: "<div class='mock-slide enter'><div class='s-title'>Why Choose Us</div><div class='s-body'><div class='s-bullet'>① 24/7 support</div><div class='s-bullet'>② Lowest total cost</div><div class='s-bullet'>③ Proven track record</div></div></div>" + MOCK.callout("Animation order corrected in the Animation Pane: 1 → 2 → 3."),
      explain:"The Animation Pane (Animations > Animation Pane) lists every animated object in firing order — drag entries up/down and adjust Start/Duration/Delay without touching the slide layout." },

    { id:"pc-3", title:"Morph Transition Between Slides", type:"sim",
      prompt:"You want a shape to appear to smoothly glide and resize from its position on Slide 4 to a new position on Slide 5, in a single continuous motion. Which transition do you apply?",
      setup: MOCK.pptSlide("Product_Launch.pptx",
        [{label:"Transition to This Slide", icons:["🎬"]},{label:"Timing", icons:["⏱️"]}],
        "Transitions",
        "<div class='s-title'>Slide 5</div><div class='s-img' style='left:26px;bottom:auto;top:70px;right:auto;'></div>"),
      options:["Animations > Morph","Transitions > Morph","Transitions > Reveal","Animations > Motion Paths > Custom Path"],
      correct:1,
      afterHTML: "<div class='mock-slide enter'><div class='s-title'>Slide 5</div><div class='s-img' style='animation:slideEnter .8s ease both;'></div></div>" + MOCK.callout("Morph applied — the shape now glides smoothly between its Slide 4 and Slide 5 positions."),
      explain:"Morph (Transitions tab) compares matching objects on the two slides and automatically animates position, size and rotation changes between them — ideal for smooth zoom/move effects without manual animation paths." },

    { id:"pc-4", title:"Embedding a Live-Linked Excel Chart", type:"sim",
      prompt:"Your sales chart lives in Sales.xlsx and gets updated weekly. You want it on a slide so that it refreshes automatically whenever the source workbook changes, instead of pasting a static picture. What do you do?",
      setup: MOCK.pptSlide("Weekly_Review.pptx",
        [{label:"Text", icons:["Aa"]},{label:"Illustrations", icons:["📊"]},{label:"Media", icons:["▶"]}],
        "Insert",
        "<div class='s-title'>Weekly Sales</div><div class='s-body'><div class='s-bullet'>(chart goes here)</div></div>"),
      options:["Insert > Picture > This Device (screenshot of the chart)","Copy the chart, Paste with source formatting embedded","Insert > Object > Paste Special > Microsoft Excel Chart Object (Link)","Insert > Chart (rebuild a brand-new native chart from scratch)"],
      correct:2,
      afterHTML: MOCK.barsChart("Weekly Sales", ["W1","W2","W3","W4"], [82,95,101,118]) + MOCK.callout("🔗 Linked to Sales.xlsx — updates automatically when the workbook changes."),
      explain:"Paste Special > Paste Link (or Insert > Object with 'Link') keeps a live connection to the source workbook, so the slide chart refreshes instead of staying a frozen picture." },

    { id:"pc-5", title:"Custom Slide Show for One Audience", type:"sim",
      prompt:"Your 20-slide deck has technical appendix slides that only the engineering team should see. For the client meeting you want to present just Slides 1, 3 and 7 — without deleting anything from the file. What feature do you use?",
      setup: MOCK.pptSlide("Master_Deck.pptx",
        [{label:"Start Slide Show", icons:["▶"]},{label:"Set Up", icons:["⚙️"]}],
        "Slide Show",
        "<div class='s-title'>20-slide master deck</div>",
        "<div class='mock-thumbstrip'><div class='th'></div><div class='th'></div><div class='th'></div><div class='th'></div><div class='th'></div><div class='th'></div><div class='th'></div></div>"),
      options:["Slide Show > Rehearse Timings","Hide each appendix slide individually via Hide Slide","Insert > Section, group the appendix slides into a new section","Slide Show > Custom Slide Show > Custom Shows"],
      correct:3,
      afterHTML: "<div class='mock-slide enter'><div class='s-title'>Custom Show: \"Client Version\"</div><div class='s-body'><div class='s-bullet'>Slide 1 → Slide 3 → Slide 7</div></div></div><div class='mock-thumbstrip'><div class='th active'></div><div class='th'></div><div class='th active'></div><div class='th'></div><div class='th'></div><div class='th'></div><div class='th active'></div></div>" + MOCK.callout("Custom Slide Show \"Client Version\" created — the full 20-slide file is untouched."),
      explain:"Custom Slide Show lets you name and present a chosen subset of slides in any order, while the original file keeps every slide intact for other audiences." },

    { id:"pc-6", title:"Action Buttons for Non-Linear Navigation", type:"sim",
      prompt:"On your Agenda slide you want a clickable button that jumps the audience straight to the 'Budget' slide when clicked during the show, instead of just moving to the next slide. What do you insert?",
      setup: MOCK.pptSlide("Agenda.pptx",
        [{label:"Illustrations", icons:["⬛"]},{label:"Links", icons:["🔗"]}],
        "Insert",
        "<div class='s-title'>Agenda</div><div class='s-body'><div class='s-bullet'>Introduction</div><div class='s-bullet'>Budget</div><div class='s-bullet'>Next Steps</div></div>"),
      options:["Insert > Shapes > Action Buttons, then Hyperlink to Slide \"Budget\"","Insert > Hyperlink on the word \"Budget\" only, no shape","Animations > Trigger > On Click of (Budget text)","Slide Show > Custom Slide Show"],
      correct:0,
      afterHTML: "<div class='mock-slide enter'><div class='s-title'>Agenda</div><div class='s-body'><div class='s-bullet'>Introduction</div><div class='s-bullet'>Budget <span style='background:#0e6b3a;color:#fff;border-radius:6px;padding:1px 8px;font-size:10px;'>▶ Go to slide</span></div><div class='s-bullet'>Next Steps</div></div></div>" + MOCK.callout("Action button added — jumps directly to the Budget slide during the show."),
      explain:"Insert > Shapes > Action Buttons (or any shape + Insert > Link) lets you wire up on-click navigation to any slide, external file or URL — essential for non-linear, audience-driven presentations." },

    { id:"pc-7", title:"Rehearse Timings for a Timed Show", type:"sim",
      prompt:"Your presentation must run unattended in a lobby kiosk, advancing slides automatically at the same pace you rehearsed. How do you capture your per-slide pacing?",
      setup: MOCK.pptSlide("Kiosk_Loop.pptx",
        [{label:"Set Up", icons:["⚙️"]},{label:"Rehearse", icons:["⏱️"]}],
        "Slide Show",
        "<div class='s-title'>Welcome</div><div class='s-body'><div class='s-bullet'>Kiosk mode — needs auto-advance timings</div></div>"),
      options:["Transitions > Advance Slide > After (set seconds manually, slide by slide)","Slide Show > Rehearse Timings (record, then save)","Slide Show > Set Up Show > Loop Continuously","Animations > Timing > Delay"],
      correct:1,
      afterHTML: "<div class='mock-slide enter'><div class='s-title'>Welcome</div><div class='s-body'><div class='s-bullet'>Slide 1: 0:08 &nbsp; Slide 2: 0:12 &nbsp; Slide 3: 0:07</div></div></div>" + MOCK.callout("Timings recorded and saved — the show now advances itself at your rehearsed pace."),
      explain:"Slide Show > Rehearse Timings lets you click through at your natural pace while PowerPoint records the exact duration of each slide, ready for 'Set Up Show > Use Timings'." }
  ]
},
{
  id: "excel-graphs", app: "excel",
  title: "Excel: Charts & Trendlines",
  tagline: "Turning raw columns into visual insight",
  subs: [
    { id:"eg-1", title:"Build a Column Chart from Selected Columns", type:"sim",
      prompt:"You've selected the Month and Sales columns (A1:B5). You want an instant chart of this data. What do you click?",
      setup: MOCK.excelSheet("Sales.xlsx",
        [{label:"Charts", icons:["📊","📈"]},{label:"Sparklines", icons:["📉"]}], "Insert", "A1:B5", "Month",
        MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1, ["Month","Sales"], {activeIdx:[0,1]}) +
        MOCK.sheetRow(2, ["Jan","120"], {activeIdx:[0,1]}) +
        MOCK.sheetRow(3, ["Feb","150"], {activeIdx:[0,1]}) +
        MOCK.sheetRow(4, ["Mar","170"], {activeIdx:[0,1]}) +
        MOCK.sheetRow(5, ["Apr","210"], {activeIdx:[0,1]}) + "</tbody>"),
      options:["Data > Sort & Filter > Sort A to Z","Insert > Table","Insert > Recommended Charts (or Insert Column Chart)","Insert > Sparklines > Column"],
      correct:2,
      afterHTML: MOCK.barsChart("Monthly Sales", ["Jan","Feb","Mar","Apr"], [120,150,170,210]) + MOCK.callout("Column chart built directly from the selected range."),
      explain:"With the range selected, Insert > Charts > Recommended Charts (or a specific chart type like Column) builds the chart instantly, already linked to that data." },

    { id:"eg-2", title:"Add a Linear Trendline with Equation & R²", type:"sim",
      prompt:"A scatter plot shows Advertising Spend vs Sales. You need to see the line of best fit, its equation, and how well it fits (R²). What do you do?",
      setup: MOCK.excelSheet("AdSpend.xlsx",
        [{label:"Chart Elements", icons:["＋"]},{label:"Trendline", icons:["／"]}], "Design", "E2", "=TREND(...)",
        MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1, ["Spend (₹k)","Sales (₹k)"]) +
        MOCK.sheetRow(2, ["10","38"]) + MOCK.sheetRow(3, ["18","52"]) + MOCK.sheetRow(4, ["25","66"]) +
        MOCK.sheetRow(5, ["30","78"]) + MOCK.sheetRow(6, ["40","98"]) + "</tbody>",
        MOCK.trendlineChart("Spend vs Sales (scatter)", [38,52,66,78,98], 460, 110, false)),
      options:["Insert > Charts > Combo Chart","Format Trendline > Moving Average","Data > Data Analysis > Regression","Chart Elements (+) > Trendline > Linear, then check 'Display Equation' & 'Display R-squared'"],
      correct:3,
      afterHTML: MOCK.trendlineChart("Spend vs Sales — Trendline", [38,52,66,78,98]) + "<p style='text-align:center;font-size:11px;color:#333;margin-top:6px;'><b>y = 2.05x + 18.4</b> &nbsp; R² = 0.97</p>" + MOCK.callout("Linear trendline fitted with equation and R² displayed."),
      explain:"The Chart Elements (+) button > Trendline > More Options lets you fit Linear/Exponential/Polynomial curves and tick 'Display Equation on chart' and 'Display R-squared value' to quantify the fit." },

    { id:"eg-3", title:"Switch Chart Type: Column → Line", type:"sim",
      prompt:"You already have a column chart of quarterly revenue, but your manager wants to see the trend as a continuous line instead. You don't want to rebuild the chart from scratch. What do you use?",
      setup: MOCK.excelSheet("Revenue.xlsx",
        [{label:"Type", icons:["🔄"]},{label:"Design", icons:["🎨"]}], "Design", "B6", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Quarter","Revenue"]) +
        MOCK.sheetRow(2,["Q1","210"]) + MOCK.sheetRow(3,["Q2","245"]) + MOCK.sheetRow(4,["Q3","238"]) + MOCK.sheetRow(5,["Q4","290"]) + "</tbody>",
        MOCK.barsChart("Revenue by Quarter (Column)", ["Q1","Q2","Q3","Q4"], [210,245,238,290])),
      options:["Chart Design > Change Chart Type > Line","Insert a brand-new Line chart alongside the old one","Format Data Series > Line (recolour only)","Design > Switch Row/Column"],
      correct:0,
      afterHTML: MOCK.trendlineChart("Revenue by Quarter (Line)", [210,245,238,290]) + MOCK.callout("Chart type switched to Line — same data, same formatting, new shape."),
      explain:"Chart Design > Change Chart Type opens a gallery to switch the visual type instantly, without touching the underlying data range or losing your titles/formatting." },

    { id:"eg-4", title:"Fix a Misleading Axis Scale", type:"sim",
      prompt:"A column chart makes Q1–Q4 revenue look almost identical because the Y-axis starts at 180 instead of 0, exaggerating small differences. How do you correct the scale?",
      setup: MOCK.excelSheet("Revenue.xlsx",
        [{label:"Format", icons:["⚙️"]},{label:"Axis Options", icons:["📐"]}], "Format", "", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Quarter","Revenue"]) +
        MOCK.sheetRow(2,["Q1","210"]) + MOCK.sheetRow(3,["Q2","245"]) + MOCK.sheetRow(4,["Q3","238"]) + MOCK.sheetRow(5,["Q4","290"]) + "</tbody>",
        MOCK.barsChart("Misleading axis (starts at 180)", ["Q1","Q2","Q3","Q4"], [30,65,58,110], 115)),
      options:["Home > Increase Decimal","Right-click Y-axis > Format Axis > set Minimum to 0","Chart Design > Change Chart Type","Insert > Chart > Recommended Charts (rebuild from scratch)"],
      correct:1,
      afterHTML: MOCK.barsChart("Corrected axis (starts at 0)", ["Q1","Q2","Q3","Q4"], [210,245,238,290]) + MOCK.callout("Axis minimum reset to 0 — the true proportions are now visible."),
      explain:"Format Axis (double-click the axis) lets you fix Minimum/Maximum/Units. Truncated axes exaggerate differences — best practice for column charts is starting the value axis at zero." },

    { id:"eg-5", title:"Combo Chart: Bars + Line on a Secondary Axis", type:"sim",
      prompt:"You want Revenue as columns and Profit Margin % as a line on the same chart — but margin (a small percentage) is invisible next to revenue in the thousands. What's the fix?",
      setup: MOCK.excelSheet("Margins.xlsx",
        [{label:"Charts", icons:["📊"]},{label:"Combo", icons:["📶"]}], "Insert", "", "",
        MOCK.sheetHead(["A","B","C"]) + "<tbody>" +
        MOCK.sheetRow(1,["Quarter","Revenue","Margin %"]) +
        MOCK.sheetRow(2,["Q1","210","18"]) + MOCK.sheetRow(3,["Q2","245","21"]) + MOCK.sheetRow(4,["Q3","238","19"]) + "</tbody>"),
      options:["Format Data Series > Fill > Solid Fill","Insert two completely separate, unlinked charts","Insert > Charts > Combo Chart, plot Margin % on a Secondary Axis","Change the Margin % cells to Percentage number format only"],
      correct:2,
      afterHTML: MOCK.barsChart("Revenue (₹k, primary axis)", ["Q1","Q2","Q3"], [210,245,238]) + MOCK.trendlineChart("Margin % (secondary axis)", [18,21,19]) + MOCK.callout("Combo chart built — bars on the primary axis, margin line on a readable secondary axis."),
      explain:"Insert > Combo Chart lets each series pick its own chart type and axis. Routing the small-scale series (percentage) to a Secondary Axis keeps both series readable at their natural scale." },

    { id:"eg-6", title:"Show Percentages on a Pie Chart", type:"sim",
      prompt:"Your pie chart shows each region's market share, but currently only shows region names — no numbers. Your manager wants each slice labeled with its percentage share. What do you do?",
      setup: MOCK.excelSheet("MarketShare.xlsx",
        [{label:"Chart Elements", icons:["＋"]},{label:"Labels", icons:["🏷️"]}], "Design", "", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Region","Share"]) +
        MOCK.sheetRow(2,["North","34"]) + MOCK.sheetRow(3,["South","21"]) + MOCK.sheetRow(4,["East","19"]) + MOCK.sheetRow(5,["West","26"]) + "</tbody>"),
      options:["Format Cells > Percentage on the raw numbers","Chart Elements (+) > Legend > Right","Insert > Charts > Doughnut instead of Pie","Chart Elements (+) > Data Labels > More Options > Percentage"],
      correct:3,
      afterHTML: MOCK.barsChart("Market Share (Region)", ["North (34%)","South (21%)","East (19%)","West (26%)"], [34,21,19,26]) + MOCK.callout("Data labels now show each slice's percentage share."),
      explain:"Chart Elements (+) > Data Labels > More Data Label Options gives checkboxes for Value, Percentage and Category Name — tick Percentage so each slice self-labels its share." },

    { id:"eg-7", title:"Sparklines — Mini Trend Inside a Cell", type:"sim",
      prompt:"You want a tiny trend line inside cell F2, right next to each product's monthly figures, without inserting a full chart object. What feature do you use?",
      setup: MOCK.excelSheet("Products.xlsx",
        [{label:"Sparklines", icons:["📉"]}], "Insert", "F2", "",
        MOCK.sheetHead(["A","B","C","D","E","F"]) + "<tbody>" +
        MOCK.sheetRow(1,["Product","Jan","Feb","Mar","Apr","Trend"]) +
        MOCK.sheetRow(2,["Widget A","40","55","50","70",""], {activeIdx:[5]}) + "</tbody>"),
      options:["Insert > Sparklines > Line","Insert > Chart > Line, then resize it to fit inside the cell","Home > Conditional Formatting > Data Bars","Home > Conditional Formatting > Icon Sets"],
      correct:0,
      afterHTML: MOCK.sheetHead(["A","B","C","D","E","F"]) + "<tbody>" +
        MOCK.sheetRow(1,["Product","Jan","Feb","Mar","Apr","Trend"]) +
        MOCK.sheetRow(2,["Widget A","40","55","50","70","📈"], {fillIdx:[5], fillColor:"#eef7f0"}) + "</tbody>" +
        "<div style='margin-top:8px;'>" + MOCK.callout("Sparkline inserted in F2 — a compact trend line living inside the cell.") + "</div>",
      explain:"Insert > Sparklines (Line/Column/Win-Loss) draws a miniature chart that lives entirely inside one cell — ideal for scanning trends down a long list of rows without a separate chart object." },

    { id:"eg-8", title:"Forecast Sheet — Projecting Future Values", type:"sim",
      prompt:"You have 12 months of historical sales and want Excel to automatically project the next 6 months, complete with a confidence interval, without writing any formulas yourself. What do you use?",
      setup: MOCK.excelSheet("Forecast.xlsx",
        [{label:"Forecast", icons:["🔮"]}], "Data", "", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Month","Sales"]) +
        MOCK.sheetRow(2,["Jan","120"]) + MOCK.sheetRow(3,["Feb","150"]) + MOCK.sheetRow(4,["Mar","170"]) + MOCK.sheetRow(5,["...","..."]) + "</tbody>"),
      options:["Data > What-If Analysis > Scenario Manager","Data > Forecast > Forecast Sheet","Insert > Recommended Charts, then extend the axis manually","Formulas > More Functions > Statistical > TREND (typed manually)"],
      correct:1,
      afterHTML: MOCK.trendlineChart("Sales — Actual + Forecast", [120,150,170,190,205,222,238]) + MOCK.callout("Forecast Sheet generated — dashed portion is Excel's projected trend with confidence bounds."),
      explain:"Data > Forecast Sheet uses exponential smoothing on your historical series to project future periods automatically, adding a shaded confidence interval — no manual formulas required." },

    { id:"eg-9", title:"Waterfall Chart for Budget Variance", type:"sim",
      prompt:"You want to show how a starting budget of ₹500k moves through additions and cuts to a final total, visualised as rising/falling floating bars. Which modern chart type fits best?",
      setup: MOCK.excelSheet("Budget.xlsx",
        [{label:"Charts", icons:["📊"]},{label:"Waterfall", icons:["🌊"]}], "Insert", "", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Item","Amount (₹k)"]) +
        MOCK.sheetRow(2,["Starting Budget","500"]) + MOCK.sheetRow(3,["Marketing +","120"]) +
        MOCK.sheetRow(4,["Ops Cut −","-80"]) + MOCK.sheetRow(5,["Final Budget","540"]) + "</tbody>"),
      options:["Insert > Charts > Stock","Insert > Charts > Pie","Insert > Charts > Waterfall","A plain Column chart with manually coloured bars"],
      correct:2,
      afterHTML: MOCK.barsChart("Budget Waterfall (simplified view)", ["Start","+Mktg","−Ops","Final"], [500,120,80,540]) + MOCK.callout("Waterfall chart inserted — visually shows how each change bridges Start to Final."),
      explain:"Insert > Charts > Waterfall (2016+) is purpose-built for bridge/variance data — each bar floats from the previous running total, making increases and decreases immediately readable." }
  ]
},
{
  id: "excel-challenge", app: "excel",
  title: "Excel Challenge",
  tagline: "Lookups, PivotTables & what-if analysis",
  subs: [
    { id:"ec-1", title:"XLOOKUP Across Sheets", type:"sim",
      prompt:"You have a Price List sheet and an Orders sheet. For each order you need to pull the unit price by matching Product ID — and the lookup table might get columns added later. Which function is the safest modern choice?",
      setup: MOCK.excelSheet("Orders.xlsx",
        [{label:"Function Library", icons:["fx"]},{label:"Lookup", icons:["🔍"]}], "Formulas", "C2", "=XLOOKUP(A2,Price!A:A,Price!C:C)",
        MOCK.sheetHead(["A","B","C"]) + "<tbody>" +
        MOCK.sheetRow(1,["ProductID","Qty","Price"]) +
        MOCK.sheetRow(2,["SKU-104","3","?"], {activeIdx:[2]}) + MOCK.sheetRow(3,["SKU-118","1","?"]) + "</tbody>"),
      options:["=VLOOKUP(A2, Price!A:C, 3, FALSE)","=LOOKUP(A2, Price!A:A, Price!C:C)","=SUMIF(Price!A:A, A2, Price!C:C)","=XLOOKUP(A2, Price!A:A, Price!C:C)"],
      correct:3,
      afterHTML: MOCK.sheetHead(["A","B","C"]) + "<tbody>" +
        MOCK.sheetRow(1,["ProductID","Qty","Price"]) +
        MOCK.sheetRow(2,["SKU-104","3","249"], {fillIdx:[2], fillColor:"#eef7f0"}) +
        MOCK.sheetRow(3,["SKU-118","1","899"], {fillIdx:[2], fillColor:"#eef7f0"}) + "</tbody>" +
        MOCK.callout("XLOOKUP pulled the correct price for every order row."),
      explain:"XLOOKUP(lookup_value, lookup_array, return_array) is column-position independent (unlike VLOOKUP's column-index number), searches in either direction, and defaults to an exact match — the safer modern choice." },

    { id:"ec-2", title:"PivotTable — Summarize Raw Sales Data", type:"sim",
      prompt:"You have 2,000 raw order rows (Region, Product, Amount). Your manager wants total sales by Region in a clean summary table, updatable if the raw data changes. What's the fastest route?",
      setup: MOCK.excelSheet("RawSales.xlsx",
        [{label:"Tables", icons:["▦"]},{label:"PivotTable", icons:["⊞"]}], "Insert", "A1", "",
        MOCK.sheetHead(["A","B","C"]) + "<tbody>" +
        MOCK.sheetRow(1,["Region","Product","Amount"]) +
        MOCK.sheetRow(2,["North","Widget","1200"]) + MOCK.sheetRow(3,["South","Widget","900"]) +
        MOCK.sheetRow(4,["North","Gadget","1500"]) + MOCK.sheetRow(5,["...2000 rows...","",""]) + "</tbody>"),
      options:["Insert > PivotTable, drag Region to Rows and Amount to Values","Data > Subtotal, grouped by Region","Data > Consolidate","Type SUMIF formulas manually for every region"],
      correct:0,
      afterHTML: MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Region","Sum of Amount"], {rowIn:true}) +
        MOCK.sheetRow(2,["North","48,200"], {rowIn:true}) +
        MOCK.sheetRow(3,["South","31,650"], {rowIn:true}) +
        MOCK.sheetRow(4,["East","27,900"], {rowIn:true}) +
        MOCK.sheetRow(5,["Grand Total","107,750"], {rowIn:true}) + "</tbody>" +
        MOCK.callout("PivotTable built — drag more fields any time to slice the data differently."),
      explain:"A PivotTable summarizes thousands of rows instantly by dragging fields into Rows/Columns/Values/Filters — and one click (Refresh) re-aggregates it if the source data changes." },

    { id:"ec-3", title:"Conditional Formatting — Colour Scale", type:"sim",
      prompt:"You have a column of 50 exam scores and want the highest scores to shade green and the lowest to shade red at a glance, without sorting the list. What do you apply?",
      setup: MOCK.excelSheet("Scores.xlsx",
        [{label:"Styles", icons:["🎨"]},{label:"Conditional Formatting", icons:["▥"]}], "Home", "B1:B6", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Student","Score"]) +
        MOCK.sheetRow(2,["Aarav","92"]) + MOCK.sheetRow(3,["Diya","54"]) +
        MOCK.sheetRow(4,["Kabir","78"]) + MOCK.sheetRow(5,["Meera","33"]) + "</tbody>"),
      options:["Home > Conditional Formatting > Data Bars","Home > Conditional Formatting > Colour Scales","Home > Conditional Formatting > Icon Sets","Home > Cell Styles > Good/Bad/Neutral (applied manually)"],
      correct:1,
      afterHTML: MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Student","Score"]) +
        MOCK.sheetRow(2,["Aarav","92"], {fillIdx:[1], fillColor:"#8fd99a"}) +
        MOCK.sheetRow(3,["Diya","54"], {fillIdx:[1], fillColor:"#ffd27a"}) +
        MOCK.sheetRow(4,["Kabir","78"], {fillIdx:[1], fillColor:"#c6e79b"}) +
        MOCK.sheetRow(5,["Meera","33"], {fillIdx:[1], fillColor:"#f2938c"}) + "</tbody>" +
        MOCK.callout("Colour Scale applied — green (high) to red (low), no sorting needed."),
      explain:"Home > Conditional Formatting > Colour Scales shades every cell by its relative value automatically, and updates live if scores change — no manual colouring or sorting required." },

    { id:"ec-4", title:"Data Validation — Restrict a Dropdown", type:"sim",
      prompt:"You want the Department column to only ever accept one of four fixed values (Sales, IT, HR, Finance) — typing anything else should be blocked. What do you set up?",
      setup: MOCK.excelSheet("Staff.xlsx",
        [{label:"Data Tools", icons:["✓"]},{label:"Data Validation", icons:["☰"]}], "Data", "B2", "",
        MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Name","Department"]) +
        MOCK.sheetRow(2,["Rohan","(type anything)"], {activeIdx:[1]}) + "</tbody>"),
      options:["Home > Conditional Formatting > Highlight Cell Rules","Insert > Table (adds filter arrows only)","Data > Data Validation > List (Sales, IT, HR, Finance)","Review > Protect Sheet"],
      correct:2,
      afterHTML: MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Name","Department"]) +
        MOCK.sheetRow(2,["Rohan","Sales ▾"], {fillIdx:[1], fillColor:"#eef7f0"}) + "</tbody>" +
        MOCK.callout("Dropdown restricted — only Sales, IT, HR or Finance can be entered."),
      explain:"Data > Data Validation > List lets you type (or reference) an allowed list of values — the cell becomes a dropdown, and any other typed entry is rejected with a warning." },

    { id:"ec-5", title:"Goal Seek — Hitting a Profit Target", type:"sim",
      prompt:"Your model shows Profit = ₹42,000 at 350 Units Sold. Your target is exactly ₹60,000 profit. You don't want to guess-and-check units by hand. What tool solves for the required input?",
      setup: MOCK.excelSheet("Model.xlsx",
        [{label:"Forecast", icons:["🎯"]},{label:"What-If Analysis", icons:["⚗️"]}], "Data", "B3", "=B1*B2-B4",
        MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Units Sold","350"]) + MOCK.sheetRow(2,["Price/Unit","300"]) +
        MOCK.sheetRow(3,["Profit","42,000"], {activeIdx:[1]}) + "</tbody>"),
      options:["Data > What-If Analysis > Scenario Manager","Data > Solver","Formulas > Trace Precedents","Data > What-If Analysis > Goal Seek (set Profit to 60,000 by changing Units Sold)"],
      correct:3,
      afterHTML: MOCK.sheetHead(["A","B"]) + "<tbody>" +
        MOCK.sheetRow(1,["Units Sold","470"], {fillIdx:[1], fillColor:"#eef7f0"}) + MOCK.sheetRow(2,["Price/Unit","300"]) +
        MOCK.sheetRow(3,["Profit","60,000"], {fillIdx:[1], fillColor:"#eef7f0"}) + "</tbody>" +
        MOCK.callout("Goal Seek solved it: 470 units are needed to reach ₹60,000 profit."),
      explain:"Goal Seek (Data > What-If Analysis) works backwards: you name a target cell, the value you want it to reach, and which single input cell it may change — Excel iterates to the exact answer." },

    { id:"ec-6", title:"Named Range Inside a Formula", type:"sim",
      prompt:"You reference the range B2:B13 in five different formulas across the workbook. If the range ever moves, all five would break. What's the more robust approach from the start?",
      setup: MOCK.excelSheet("Budget.xlsx",
        [{label:"Defined Names", icons:["🏷️"]},{label:"Name Manager", icons:["📛"]}], "Formulas", "D1", "=SUM(B2:B13)",
        MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Month","Sales"]) +
        MOCK.sheetRow(2,["Jan","120"]) + MOCK.sheetRow(3,["…","…"]) + "</tbody>"),
      options:["Formulas > Define Name (e.g. 'TotalSales' for B2:B13), then use =SUM(TotalSales)","Format the range as an Excel Table and reference its column header","Copy the formula into all five locations by hand each time it changes","Use absolute references ($B$2:$B$13) only, with no name"],
      correct:0,
      afterHTML: MOCK.sheetHead(["A","B"]) + "<tbody>" + MOCK.sheetRow(1,["Month","Sales"]) +
        MOCK.sheetRow(2,["Jan","120"]) + MOCK.sheetRow(3,["…","…"]) + "</tbody>" +
        "<p style='font-family:monospace;background:#fff;border:1px solid #d7d7d7;border-radius:4px;padding:6px 10px;margin-top:8px;font-size:11.5px;'>=SUM(<b style='color:#0e6b3a'>TotalSales</b>)</p>" +
        MOCK.callout("Named range 'TotalSales' created — every formula using it stays correct even if the range moves."),
      explain:"Formulas > Define Name creates a readable, self-updating label for a range. Formulas that reference the name (rather than raw cell addresses) keep working even if rows are inserted or the range shifts." },

    { id:"ec-7", title:"Freeze Panes + Filter on a Large Table", type:"sim",
      prompt:"You're scrolling through a 500-row table and keep losing track of which column is which, plus you need to quickly show only 'Region = North' rows. Which two features do you combine?",
      setup: MOCK.excelSheet("BigTable.xlsx",
        [{label:"Window", icons:["🧊"]},{label:"Sort & Filter", icons:["▽"]}], "View", "B2", "",
        MOCK.sheetHead(["A","B","C"]) + "<tbody>" +
        MOCK.sheetRow(1,["Region","Product","Amount"]) +
        MOCK.sheetRow(2,["North","Widget","1200"]) + MOCK.sheetRow(3,["South","Gadget","800"]) +
        MOCK.sheetRow(4,["…500 rows…","",""]) + "</tbody>"),
      options:["Insert > Table (adds banding and filter arrows, but no freeze)","View > Freeze Panes (top row) + Data > Filter (dropdown arrows)","View > Split (splits the window instead of freezing)","Home > Format > Hide Rows for irrelevant regions"],
      correct:1,
      afterHTML: MOCK.sheetHead(["A","B","C"]) + "<tbody>" +
        MOCK.sheetRow(1,["Region ▾","Product ▾","Amount ▾"], {rowIn:true}) +
        MOCK.sheetRow(2,["North","Widget","1200"], {rowIn:true}) +
        MOCK.sheetRow(3,["North","Chair","640"], {rowIn:true}) + "</tbody>" +
        MOCK.callout("Header row frozen and Filter applied — showing only Region = North."),
      explain:"View > Freeze Panes keeps header rows visible while scrolling; Data > Filter adds dropdown arrows to instantly show/hide rows by any column's values — together they make huge tables navigable." }
  ]
},
// ============================================================ NETMAIL 1
{
  id: "netmail-basics", app: "netmail",
  title: "Internet Foundations",
  tagline: "Browsers, URLs & how the web works",
  subs: [
    { id:"n1-1", title:"Spotting a Secure Connection", type:"click",
      prompt:"You want to check whether a website connection is secure (encrypted) before entering a password. What do you look for in the browser?",
      ribbon:"Browser Elements",
      options:["The page's word count","A padlock icon next to the address bar","The number of open tabs","The browser's version number"], correct:1,
      explain:"A padlock icon beside the address bar indicates an HTTPS (encrypted) connection, meaning data sent to that site is protected in transit." },
    { id:"n1-2", title:"HTTP vs HTTPS", type:"mcq",
      prompt:"What does 'https://' at the start of a URL indicate, compared to 'http://'?",
      options:["The site is hosted in the USA","The connection to the site is encrypted","The site is a search engine","The page cannot be printed"], correct:1,
      explain:"The 's' in HTTPS stands for 'Secure' — data exchanged between your browser and the site is encrypted, protecting it from interception." },
    { id:"n1-3", title:"Reading a URL", type:"mcq",
      prompt:"In the address 'https://www.invertis.org/admissions', which part is the domain name?",
      options:["https://","www.invertis.org","admissions","www"], correct:1,
      explain:"'www.invertis.org' is the domain name identifying the website itself; '/admissions' is a specific page (path) on that site." },
    { id:"n1-4", title:"How Search Engines Work", type:"truefalse",
      prompt:"True or False: A search engine like Google stores a live, permanent copy of every website directly on its own servers, rather than the original site being hosted elsewhere.",
      correct:false,
      explain:"Search engines crawl and index the web, storing summaries/cached snapshots for fast searching — the actual live website continues to be hosted on its own server." },
    { id:"n1-5", title:"Naming the Browser", type:"fill",
      prompt:"Type the general term for software used to browse and display web pages (e.g., Chrome, Firefox, Edge).",
      accepted:["browser","web browser"], hint:"Two words, or one — it 'browses' the web.",
      explain:"A web browser is application software that requests, renders and displays web pages from servers." },
    { id:"n1-6", title:"Getting Online", type:"mcq",
      prompt:"Which of these best describes the role of an Internet Service Provider (ISP)?",
      options:["A company that provides your connection to the internet","A search engine that indexes websites","A type of email attachment","A built-in browser feature for bookmarks"], correct:0,
      explain:"An ISP (e.g. a telecom or broadband company) provides the physical/wireless connection that links your device to the wider internet." },
    { id:"n1-7", title:"The Web's Transfer Protocol", type:"mcq",
      prompt:"Which protocol is primarily used to transfer web pages between a server and your browser?",
      options:["FTP","HTTP / HTTPS","SMTP","POP3"], correct:1,
      explain:"HTTP (and its secure form HTTPS) is the protocol browsers and web servers use to request and deliver web pages." }
  ]
},

// ============================================================ NETMAIL 2
{
  id: "netmail-advanced", app: "netmail",
  title: "Email Essentials",
  tagline: "Composing, organising & staying safe",
  subs: [
    { id:"n2-1", title:"Hiding Recipients From Each Other", type:"click",
      prompt:"You want to send the same email to multiple people, but hide each recipient's address from the others. Which compose field do you use?",
      ribbon:"Email Compose Fields",
      options:["To","Cc","Bcc","Subject"], correct:2,
      explain:"Bcc (Blind Carbon Copy) sends a copy without revealing that recipient's address to anyone else on the message." },
    { id:"n2-2", title:"What Does 'Cc' Mean?", type:"mcq",
      prompt:"What does 'Cc' stand for in an email header?",
      options:["Copy Control","Carbon Copy","Confirm Contact","Central Copy"], correct:1,
      explain:"'Cc' stands for Carbon Copy — a term carried over from the era of literal carbon-paper copies of typed letters." },
    { id:"n2-3", title:"Recognising Phishing", type:"mcq",
      prompt:"You receive an email urgently asking you to click a link and 'verify your bank password immediately'. What is this an example of?",
      options:["Spam only","A phishing attempt","A calendar invite","An auto-reply"], correct:1,
      explain:"Phishing emails impersonate a trusted source to trick you into revealing passwords or personal data — never click such links; verify independently instead." },
    { id:"n2-4", title:"Deleted Isn't Always Gone", type:"truefalse",
      prompt:"True or False: Once an email is moved to the Trash/Bin folder, it is immediately and permanently deleted with no way to recover it.",
      correct:false,
      explain:"Most email services keep deleted items in Trash for a set period (often 30 days) before permanent deletion, so recovery is usually possible for a while." },
    { id:"n2-5", title:"Naming Unwanted Mail", type:"fill",
      prompt:"Type the term for unwanted, unsolicited bulk email, often filtered automatically into its own folder.",
      accepted:["spam","junk","junk mail","junk email"], hint:"Also the name of a canned meat brand, famously.",
      explain:"Spam (or Junk) filters try to automatically catch unsolicited bulk/scam email before it reaches your inbox." },
    { id:"n2-6", title:"Before You Attach", type:"mcq",
      prompt:"Before sending a large video file by email, what should you check first?",
      options:["The recipient's font preferences","Your email service's attachment size limit","The subject line's colour","Whether the ribbon is minimised"], correct:1,
      explain:"Most email providers cap attachment size (commonly 20–25 MB); oversized files should instead be shared via a cloud-storage link." },
    { id:"n2-7", title:"Reply vs Reply All", type:"mcq",
      prompt:"'Reply All' differs from 'Reply' because it...",
      options:["Sends your reply to the original sender and every other recipient on the email","Permanently deletes the original message","Forwards the email to a brand-new address you type in","Sends the reply as a text message instead of email"], correct:0,
      explain:"Reply All includes every original recipient (To and Cc) in your response — useful for group discussions, but easy to overuse accidentally." }
  ]
},

// ============================================================ ACCESS 1
{
  id: "access-basics", app: "access",
  title: "Access Foundations",
  tagline: "Tables, fields & data types",
  subs: [
    { id:"a1-1", title:"Designing a Table's Structure", type:"click",
      prompt:"You're designing a new table and need to choose whether a field stores whole numbers, text, or dates. Which view do you switch to?",
      ribbon:"Table Views",
      options:["Datasheet View","Design View","Layout View","Print Preview"], correct:1,
      explain:"Design View lets you define each field's name, data type and properties before you start entering actual data in Datasheet View." },
    { id:"a1-2", title:"Choosing a Data Type", type:"mcq",
      prompt:"Which data type would you choose for a 'Date of Birth' field?",
      options:["Short Text","Number","Date/Time","Yes/No"], correct:2,
      explain:"Date/Time correctly stores calendar dates, enabling date-based sorting, filtering and calculations (e.g., computing age)." },
    { id:"a1-3", title:"The Role of a Primary Key", type:"mcq",
      prompt:"What is the purpose of a Primary Key in an Access table?",
      options:["It formats the table's font","It uniquely identifies each record in the table","It sorts the table alphabetically","It hides duplicate columns from view"], correct:1,
      explain:"The Primary Key guarantees every record can be uniquely identified — no two records may share the same Primary Key value." },
    { id:"a1-4", title:"Primary Key Uniqueness", type:"truefalse",
      prompt:"True or False: Two different records in the same table are allowed to share the same value in the Primary Key field.",
      correct:false,
      explain:"Primary Key values must be unique across all records — Access will reject a duplicate entry in that field." },
    { id:"a1-5", title:"Naming a Row of Data", type:"fill",
      prompt:"Type the term for a single row of data in an Access table, representing one complete entry (e.g., one student).",
      accepted:["record","row"], hint:"Each one is like one index card in a filing box.",
      explain:"A record is one complete row in a table — e.g., one student's full set of details (name, roll number, marks, etc.)." },
    { id:"a1-6", title:"Restricting to Two Values", type:"mcq",
      prompt:"Which data type restricts a field to only two possible values, such as True/False or Yes/No?",
      options:["Yes/No","Short Text","AutoNumber","OLE Object"], correct:0,
      explain:"The Yes/No (Boolean) data type stores only two states, ideal for flags like 'Is Active?' or 'Paid?'." },
    { id:"a1-7", title:"What Is a Database?", type:"mcq",
      prompt:"A collection of related tables, queries, forms and reports stored together is called a...?",
      options:["Spreadsheet","Database","Presentation","Document"], correct:1,
      explain:"A database is an organised collection of related tables and the tools (queries, forms, reports) built around them." }
  ]
},

// ============================================================ ACCESS 2
{
  id: "access-queries-forms", app: "access",
  title: "Queries, Forms & Reports",
  tagline: "Asking questions of your data",
  subs: [
    { id:"a2-1", title:"Filtering Records with a Query", type:"click",
      prompt:"You want to see only the students who scored above 80 marks, instead of browsing the entire table. Which Access object do you create?",
      ribbon:"Create Tab",
      options:["Table","Query","Macro","Module"], correct:1,
      explain:"A Query lets you ask a specific question of your data (e.g., 'marks > 80') and returns only the matching records." },
    { id:"a2-2", title:"Setting a Condition in Design View", type:"mcq",
      prompt:"In Query Design View, which row do you use to specify a condition like '>80'?",
      options:["Field row","Table row","Sort row","Criteria row"], correct:3,
      explain:"The Criteria row is where you type conditions (like >80, or \"Y\") that filter which records the query returns." },
    { id:"a2-3", title:"What Forms Are For", type:"mcq",
      prompt:"What is the main purpose of an Access Form?",
      options:["To store the raw table structure only","To provide a user-friendly screen for entering and viewing data","To connect the database to the internet","To compress the database file"], correct:1,
      explain:"Forms present table data through a friendlier, controlled interface — ideal for staff entering or reviewing records without touching the raw table." },
    { id:"a2-4", title:"Reports vs Forms", type:"truefalse",
      prompt:"True or False: An Access Report is primarily designed for on-screen data entry, in the same way a Form is.",
      correct:false,
      explain:"Reports are designed for formatted, print-ready summaries and presentation of data — not for entering or editing records, which is the Form's job." },
    { id:"a2-5", title:"Matching Text Patterns", type:"fill",
      prompt:"Type the keyword typically used in a query's Criteria to match a partial text pattern, e.g. Like \"A*\".",
      accepted:["like"], hint:"It's the same word used in the example itself.",
      explain:"The Like operator, combined with wildcards (* or ?), lets a query match partial or pattern-based text, e.g. all names starting with 'A'." },
    { id:"a2-6", title:"Sorting Query Results", type:"mcq",
      prompt:"You want a query's results sorted by 'Marks' from highest to lowest. Which sort order do you choose?",
      options:["Ascending","Descending","Filtered","Grouped"], correct:1,
      explain:"Descending order arranges values from highest to lowest — Ascending would instead go from lowest to highest." },
    { id:"a2-7", title:"Choosing the Right Object", type:"mcq",
      prompt:"Which Access object would best summarise total sales per region, ready for printing to management?",
      options:["Table","Form","Report","Macro"], correct:2,
      explain:"Reports are purpose-built for grouped, formatted summaries (e.g., totals per region) intended for printing or sharing, not live editing." }
  ]
},
// ============================================================ NETMAIL CHALLENGE
{
  id: "netmail-challenge", app: "netmail",
  title: "Internet & Email Challenge",
  tagline: "Real-world browsing & inbox scenarios",
  subs: [
    { id:"nc-1", title:"Attaching a File to an Email", type:"sim",
      prompt:"You need to send your assignment file along with a short email to your professor. What do you click to attach the document before sending?",
      setup: MOCK.netmailWindow("New Message", [{label:"Attach", icons:["📎","🖼️"]},{label:"Send", icons:["➤"]}], "Home",
        "<div class=\"mock-page\"><p style='color:#888;'>To: professor@invertis.org</p><p style='color:#888;'>Subject: Assignment Submission — Physics Lab</p><p>Dear Sir,<br>Please find my completed lab assignment.</p><p style='color:#888;'>(no attachment yet)</p></div>"),
      options:["Insert > Table","Attach (paperclip icon) > choose file","Format > Bullets","Options > Delay Delivery"],
      correct:1,
      afterHTML: "<div class='mock-page'><p style='color:#888;'>To: professor@invertis.org</p><p style='color:#888;'>Subject: Assignment Submission — Physics Lab</p><p>Dear Sir,<br>Please find my completed lab assignment.</p><p style='background:#f3f2f1;border-radius:6px;padding:6px 10px;display:inline-block;'>📄 Assignment_PhysicsLab.pdf (1.2 MB)</p></div>" + MOCK.callout("File attached — ready to send."),
      explain:"The paperclip/Attach control opens a file picker; the chosen file is bundled with the message and uploaded when you hit Send." },

    { id:"nc-2", title:"Spotting a Phishing Email", type:"sim",
      prompt:"Your inbox shows the message below. Which single detail here is the strongest warning sign that this is a phishing attempt rather than a genuine bank email?",
      setup: MOCK.netmailWindow("Inbox", [{label:"Delete", icons:["🗑️"]},{label:"Report", icons:["🚩"]}], "Home",
        MOCK.inboxList([
          {from:"HDFC-Security", subject:"URGENT: Verify your account in 24 hours or it will be suspended!", time:"09:14", active:true, unread:true},
          {from:"Mom", subject:"Call me when you're free", time:"08:02"},
          {from:"Registrar Office", subject:"Semester timetable released", time:"Yesterday"}
        ]) + "<div class='mock-page' style='margin-top:10px;'><p style='font-size:11px;color:#888;'>From: hdfc.security@secure-verify-accounts.info</p><p>Dear Customer, your account will be suspended. Click here to verify your password immediately: <span style='color:#185abc;'>secure-verify-accounts.info/login</span></p></div>"),
      options:["The email has a subject line at all","It creates false urgency and the sender's domain isn't the bank's real domain","It was received in the morning","It is addressed to 'Dear Customer' in English"],
      correct:1,
      afterHTML: "<div class='mock-page'><p><b>🚩 Red flags identified:</b></p><p>• Sender domain 'secure-verify-accounts.info' does not match the bank's real domain</p><p>• Manufactured urgency ('24 hours or suspended')</p><p>• Generic greeting, and a request to click a link and enter a password</p></div>" + MOCK.callout("Reported as phishing — never click the link or enter a password."),
      explain:"Genuine banks never ask you to 'verify' your password via an emailed link, and the real giveaway is almost always a sender domain that only looks similar to the genuine one. Urgency and generic greetings are supporting red flags." },

    { id:"nc-3", title:"Searching the Web Effectively", type:"sim",
      prompt:"You want to find PDF documents (not web pages) about 'renewable energy' published specifically on .edu websites. What should you type into the search box?",
      setup: MOCK.browserWindow("search-engine.example/search",
        "<div class='mock-page'><p style='color:#888;'>Search box:</p><p style='border:1px solid #cfcfcf;border-radius:20px;padding:8px 14px;'>renewable energy</p></div>"),
      options:["renewable energy", "\"renewable energy\" pdf edu", "renewable energy filetype:pdf site:edu", "renewable-energy.com"],
      correct:2,
      afterHTML: "<div class='mock-page'><p style='color:#888;'>Search box:</p><p style='border:1px solid #185abc;border-radius:20px;padding:8px 14px;'>renewable energy filetype:pdf site:edu</p><p style='margin-top:10px;font-size:11.5px;color:#555;'>≈ 4,200 results — all .edu domains, PDF format</p></div>" + MOCK.callout("Search operators applied — results narrowed precisely."),
      explain:"The filetype: and site: search operators let you restrict results to a specific file format and domain, turning a vague search into a precise one." },

    { id:"nc-4", title:"Organising an Overflowing Inbox", type:"sim",
      prompt:"Your inbox has hundreds of mixed emails: college notices, personal mail, and newsletters, making anything hard to find. What is the best long-term fix?",
      setup: MOCK.netmailWindow("Inbox (438 unread)", [{label:"New Folder", icons:["📁"]},{label:"Rules", icons:["⚙️"]}], "Folder",
        MOCK.inboxList([
          {from:"Registrar Office", subject:"Exam datesheet released", time:"10:02", unread:true},
          {from:"Newsletter Weekly", subject:"This week's top 10 tech stories", time:"09:40", unread:true},
          {from:"Amit (friend)", subject:"Movie plan this weekend?", time:"09:12", unread:true},
          {from:"Registrar Office", subject:"Fee payment reminder", time:"Yesterday", unread:true}
        ])),
      options:["Delete every email older than a week","Create labelled folders (e.g. 'College', 'Personal', 'Newsletters') and set rules to auto-sort incoming mail","Change the inbox font size","Turn off notifications entirely"],
      correct:1,
      afterHTML: "<div class='mock-page'><p>📁 College (2 new)</p><p>📁 Personal (1 new)</p><p>📁 Newsletters (1 new)</p><p style='margin-top:8px;color:#555;font-size:11.5px;'>Rule created: mail from 'Registrar Office' → auto-move to 'College'</p></div>" + MOCK.callout("Inbox reorganised — future mail sorts itself."),
      explain:"Folders combined with automatic rules (filters) keep an inbox organised going forward, rather than requiring a one-time manual cleanup that will just pile up again." },

    { id:"nc-5", title:"Cc or Bcc for a Large Announcement?", type:"sim",
      prompt:"You are emailing 60 unrelated external stakeholders about an event, and want none of them to see each other's email addresses. Which field should hold all 60 addresses?",
      setup: MOCK.netmailWindow("New Message", [{label:"To/Cc/Bcc", icons:["👥"]}], "Home",
        "<div class='mock-page'><p style='color:#888;'>To: ___________</p><p style='color:#888;'>Cc: ___________</p><p style='color:#888;'>Bcc: ___________</p><p>Subject: Invitation — Annual Tech Fest</p></div>"),
      options:["Put all 60 addresses in the To field","Put all 60 addresses in the Cc field","Put your own address in To, and all 60 addresses in Bcc","Send 60 separate emails manually, one at a time"],
      correct:2,
      afterHTML: "<div class='mock-page'><p>To: <span style='color:#185abc;'>you@invertis.org</span></p><p>Bcc: <span style='color:#185abc;'>60 recipients (hidden from each other)</span></p><p>Subject: Invitation — Annual Tech Fest</p></div>" + MOCK.callout("Addresses protected — recipients cannot see each other's emails."),
      explain:"Putting your own address in To and all recipients in Bcc sends one email efficiently while keeping every recipient's address private from the others — good etiquette (and often a privacy requirement) for mass mail." },

    { id:"nc-6", title:"Setting Up a Professional Signature", type:"sim",
      prompt:"You send emails to faculty regularly and want your name, roll number and course to appear automatically at the bottom of every new email, without retyping it each time. What do you set up?",
      setup: MOCK.netmailWindow("Settings", [{label:"Compose", icons:["✎"]},{label:"Signature", icons:["🖋️"]}], "Home",
        "<div class='mock-page'><p><b>Compose settings</b></p><p style='color:#888;'>Signature: (none set)</p></div>"),
      options:["Type your name manually at the end of every single email","Create a Signature in the mail settings, which is then auto-inserted into new messages","Save your name as a Bcc address","Attach a Word document containing your name to every email"],
      correct:1,
      afterHTML: "<div class='mock-page'><p><b>Compose settings</b></p><p style='color:#0e6b3a;'>Signature saved ✓</p><hr style='border:none;border-top:1px solid #eee;margin:8px 0;'/><p style='font-size:11.5px;color:#555;'>Rahul Sharma<br>B.Sc. (Vocational), Roll No. 2026045<br>Invertis University, Bareilly</p></div>" + MOCK.callout("Signature will now appear automatically on every new message."),
      explain:"A saved Signature is automatically appended to new (and often reply) messages by the email client itself, saving you from retyping the same closing details every time." },

    { id:"nc-7", title:"Checking Before You Enter a Password", type:"sim",
      prompt:"You're about to log in to your college portal, but the page looks slightly different from usual. What is the single most important check before typing your password?",
      setup: MOCK.browserWindow("student-portal-invertis.info/login",
        "<div class='mock-page'><p><b>Student Login</b></p><p>Username: ___________</p><p>Password: ___________</p></div>"),
      options:["Check the page's font looks the same as usual","Carefully verify the domain in the address bar matches the college's real, known domain","Check whether the page loads quickly","Check whether the login button is blue or green"],
      correct:1,
      afterHTML: "<div class='mock-page'><p style='color:#a4373a;'>⚠ Address bar shows 'student-portal-invertis.info' — the real portal domain is 'portal.invertis.org'.</p><p>Do not enter your password here.</p></div>" + MOCK.callout("Domain mismatch caught before any credentials were entered."),
      explain:"Look-alike domains are a classic phishing technique. Always verify the exact domain in the address bar against the institution's genuine, known web address before entering any credentials." }
  ]
},

// ============================================================ ACCESS CHALLENGE
{
  id: "access-challenge", app: "access",
  title: "MS Access Challenge",
  tagline: "Build, query and report on a real database",
  subs: [
    { id:"ac-1", title:"Setting the Right Primary Key", type:"sim",
      prompt:"You're creating a 'Students' table. Which field should you set as the Primary Key to guarantee every student record is uniquely identifiable?",
      setup: MOCK.accessWindow("Students : Table", [{label:"Views", icons:["▤"]},{label:"Tools", icons:["🔑"]}], "Home",
        "<table class='mock-sheet'><thead><tr><th>Field Name</th><th>Data Type</th></tr></thead><tbody><tr><td class='lbl'>StudentName</td><td class='lbl'>Short Text</td></tr><tr><td class='lbl'>RollNo</td><td class='lbl'>Short Text</td></tr><tr><td class='lbl'>Course</td><td class='lbl'>Short Text</td></tr><tr><td class='lbl'>DOB</td><td class='lbl'>Date/Time</td></tr></tbody></table>"),
      options:["StudentName — names are easy to remember","RollNo — unique to every student and never repeats","Course — groups students together","DOB — dates are always unique"],
      correct:1,
      afterHTML: "<table class='mock-sheet'><thead><tr><th>Field Name</th><th>Data Type</th><th>Key</th></tr></thead><tbody><tr><td class='lbl'>StudentName</td><td class='lbl'>Short Text</td><td></td></tr><tr><td class='lbl' style='background:#fff3cd;'>RollNo</td><td class='lbl'>Short Text</td><td>🔑</td></tr><tr><td class='lbl'>Course</td><td class='lbl'>Short Text</td><td></td></tr></tbody></table>" + MOCK.callout("RollNo set as Primary Key — guaranteed unique per student."),
      explain:"RollNo is guaranteed unique to each student (unlike names, which can repeat, or course/DOB, which many students can share), making it the correct choice for the Primary Key." },

    { id:"ac-2", title:"Building a Criteria Query", type:"sim",
      prompt:"You need a list of only those students who scored 80 or more marks. In Query Design View, what do you type in the Criteria row under the 'Marks' column?",
      setup: MOCK.accessWindow("Query1 : Query Design", [{label:"Run", icons:["▶"]},{label:"Show Table", icons:["＋"]}], "Home",
        "<table class='mock-sheet'><thead><tr><th></th><th>StudentName</th><th>Marks</th></tr></thead><tbody><tr><th>Field</th><td class='lbl'>StudentName</td><td class='lbl'>Marks</td></tr><tr><th>Table</th><td class='lbl'>Students</td><td class='lbl'>Students</td></tr><tr><th>Criteria</th><td></td><td style='color:#888;'>?</td></tr></tbody></table>"),
      options:["= 80 only","<80","&gt;=80","\"80\""],
      correct:2,
      afterHTML: "<table class='mock-sheet'><thead><tr><th></th><th>StudentName</th><th>Marks</th></tr></thead><tbody><tr><th>Field</th><td class='lbl'>StudentName</td><td class='lbl'>Marks</td></tr><tr><th>Table</th><td class='lbl'>Students</td><td class='lbl'>Students</td></tr><tr><th>Criteria</th><td></td><td class='mock-fill' style='--fillc:#fff3cd;'>&gt;=80</td></tr></tbody></table>" + MOCK.callout("Query returns only students scoring 80 or above."),
      explain:"Entering >=80 in the Criteria row under Marks filters the query to return only records where Marks is 80 or higher." },

    { id:"ac-3", title:"Linking Two Related Tables", type:"sim",
      prompt:"You have a 'Students' table and a 'Fees' table, each with a 'RollNo' field. You want Access to enforce that every fee record belongs to a real student. What do you set up?",
      setup: MOCK.accessWindow("Relationships", [{label:"Design", icons:["🔗"]}], "Database Tools",
        "<div class='mock-access-navpane'><b>Students</b> (RollNo, Name, Course) &nbsp;&nbsp;&nbsp; <b>Fees</b> (RollNo, Amount, Date)</div><p style='color:#888;text-align:center;'>(no relationship drawn yet)</p>"),
      options:["Copy the Students table into the Fees table","Create a Relationship between the two tables' RollNo fields, with referential integrity enforced","Rename both tables to the same name","Delete the RollNo field from the Fees table"],
      correct:1,
      afterHTML: "<div class='mock-access-navpane'><b>Students</b> (RollNo, Name, Course) &nbsp;&nbsp;&mdash;1:∞&mdash;&nbsp;&nbsp; <b>Fees</b> (RollNo, Amount, Date)</div><p style='text-align:center;color:#0e6b3a;'>Relationship created — referential integrity enforced ✓</p>" + MOCK.callout("A Fees record can no longer reference a non-existent student."),
      explain:"A Relationship (typically one-to-many here — one student, many fee payments) linked on the shared RollNo field, with referential integrity enforced, prevents orphaned Fees records that reference a student who doesn't exist." },

    { id:"ac-4", title:"Creating a Data-Entry Form", type:"sim",
      prompt:"Office staff need an easy screen to add new students without touching the raw table grid. What is the fastest way to generate one from the Students table?",
      setup: MOCK.accessWindow("Students : Table", [{label:"Forms", icons:["▤"]}], "Create",
        "<table class='mock-sheet'><thead><tr><th>RollNo</th><th>Name</th><th>Course</th></tr></thead><tbody><tr><td class='lbl'>2026001</td><td class='lbl'>A. Sharma</td><td class='lbl'>B.Sc. Voc.</td></tr></tbody></table>"),
      options:["Create > Form (auto-generates a form from the selected table)","Manually redraw the table as an image","Export the table to PDF and print blank copies","Create > Report"],
      correct:0,
      afterHTML: "<div class='mock-page'><p><b>Students Form</b></p><p>Roll No: <span style='background:#f3f2f1;padding:2px 8px;border-radius:3px;'>___________</span></p><p>Name: <span style='background:#f3f2f1;padding:2px 8px;border-radius:3px;'>___________</span></p><p>Course: <span style='background:#f3f2f1;padding:2px 8px;border-radius:3px;'>___________</span></p></div>" + MOCK.callout("Form generated — ready for easy, guided data entry."),
      explain:"Create > Form instantly builds a usable data-entry form from the selected table's fields, which can then be customised further in Layout or Design view." },

    { id:"ac-5", title:"Summarising Data for Management", type:"sim",
      prompt:"The Principal wants a printed summary of total fees collected, grouped by Course. Which Access object is designed exactly for this?",
      setup: MOCK.accessWindow("Fees : Table", [{label:"Reports", icons:["🖨️"]}], "Create",
        "<table class='mock-sheet'><thead><tr><th>Course</th><th>Amount</th></tr></thead><tbody><tr><td class='lbl'>B.Sc. Voc.</td><td>45,000</td></tr><tr><td class='lbl'>B.Sc. Voc.</td><td>45,000</td></tr><tr><td class='lbl'>BCA</td><td>52,000</td></tr></tbody></table>"),
      options:["A Table","A Form","A Report, grouped by Course with a sum in the group footer","A Macro"],
      correct:2,
      afterHTML: "<div class='mock-page'><p><b>Fee Collection Summary</b></p><p style='font-weight:700;'>B.Sc. Voc.</p><p style='padding-left:12px;'>Subtotal: ₹90,000</p><p style='font-weight:700;'>BCA</p><p style='padding-left:12px;'>Subtotal: ₹52,000</p><p style='border-top:1px solid #333;margin-top:6px;padding-top:4px;font-weight:800;'>Grand Total: ₹1,42,000</p></div>" + MOCK.callout("Report generated — grouped and totalled, ready to print."),
      explain:"Reports are Access's tool for grouped, formatted, print-ready summaries — grouping by Course and adding a Sum in the group footer produces exactly this kind of management summary." },

    { id:"ac-6", title:"Sorting & Filtering the Datasheet", type:"sim",
      prompt:"While browsing the Students table directly, you want to quickly see only 'BCA' students, ordered by RollNo. Without building a separate query, what is the fastest approach?",
      setup: MOCK.accessWindow("Students : Table", [{label:"Sort & Filter", icons:["⇅","▼"]}], "Home",
        "<table class='mock-sheet'><thead><tr><th>RollNo</th><th>Name</th><th>Course</th></tr></thead><tbody><tr><td class='lbl'>2026003</td><td class='lbl'>P. Verma</td><td class='lbl'>BCA</td></tr><tr><td class='lbl'>2026001</td><td class='lbl'>A. Sharma</td><td class='lbl'>B.Sc. Voc.</td></tr><tr><td class='lbl'>2026002</td><td class='lbl'>S. Khan</td><td class='lbl'>BCA</td></tr></tbody></table>"),
      options:["Delete all non-BCA rows permanently","Use the column header's Filter (funnel) and Sort controls directly in Datasheet View","Export everything to Excel first","Create a new table containing only BCA students"],
      correct:1,
      afterHTML: "<table class='mock-sheet'><thead><tr><th>RollNo ↑</th><th>Name</th><th>Course</th></tr></thead><tbody><tr class='mock-rowin'><td class='lbl'>2026002</td><td class='lbl'>S. Khan</td><td class='lbl'>BCA</td></tr><tr class='mock-rowin'><td class='lbl'>2026003</td><td class='lbl'>P. Verma</td><td class='lbl'>BCA</td></tr></tbody></table>" + MOCK.callout("Filtered to BCA only, sorted by RollNo — original data untouched."),
      explain:"The built-in column header Filter and Sort controls in Datasheet View let you instantly narrow and order what you see, without altering the underlying table or needing a separate saved query." },

    { id:"ac-7", title:"Preventing Bad Data at Entry", type:"sim",
      prompt:"Staff have occasionally typed marks like '105' or 'ninety' into a Marks field that should only ever hold whole numbers from 0 to 100. What is the best fix at the table-design level?",
      setup: MOCK.accessWindow("Students : Table (Design View)", [{label:"Field Properties", icons:["⚙️"]}], "Home",
        "<table class='mock-sheet'><thead><tr><th>Field Name</th><th>Data Type</th></tr></thead><tbody><tr><td class='lbl'>Marks</td><td class='lbl'>Short Text</td></tr></tbody></table><p style='color:#888;font-size:11px;margin-top:6px;'>Validation Rule: (none set)</p>"),
      options:["Keep Marks as Short Text and just ask staff to be careful","Change Marks to Number, and set a Validation Rule such as Between 0 And 100","Delete the Marks field entirely","Rename the field to 'MarksCorrect'"],
      correct:1,
      afterHTML: "<table class='mock-sheet'><thead><tr><th>Field Name</th><th>Data Type</th></tr></thead><tbody><tr><td class='lbl'>Marks</td><td class='lbl'>Number</td></tr></tbody></table><p style='color:#0e6b3a;font-size:11px;margin-top:6px;'>Validation Rule: Between 0 And 100 ✓<br>Validation Text: \"Enter a mark between 0 and 100\"</p>" + MOCK.callout("Invalid entries like 105 or 'ninety' are now rejected automatically."),
      explain:"Setting the correct Number data type plus a Validation Rule (Between 0 And 100) stops invalid values from ever being saved, catching data-entry mistakes at the source rather than after the fact." }
  ]
},
];

// Flat lookup helpers
const SECTION_MAP = {};
SECTIONS.forEach(s => { SECTION_MAP[s.id] = s; s.total = s.subs.length; });
