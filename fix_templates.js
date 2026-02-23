const fs = require('fs');
const path = require('path');

const dir = './src/components/resume/templates';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // They all have: "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"
  // Let's replace it with a helper variable or just inline interpolation
  
  // First, extract the first div's className to see what it looks like.
  // Actually we can just do a regex replace:
  // /className=\{`\$\{data\?\.fontSize \? "resume-font-scale-" \+ data\.fontSize : "resume-font-scale-medium"\} /
  // Let's replace the whole template string start and prepend the new classes.
  
  content = content.replace(
    /\$\{data\?\.fontSize \? "resume-font-scale-" \+ data\.fontSize : "resume-font-scale-medium"\}/g,
    '${data?.fontSize ? "resume-font-scale-" + data.fontSize : "resume-font-scale-medium"} ${data?.headerSize ? "resume-header-scale-" + data.headerSize : "resume-header-scale-" + (data?.fontSize || "medium")} ${data?.headingSize ? "resume-heading-scale-" + data.headingSize : "resume-heading-scale-" + (data?.fontSize || "medium")}'
  );
  
  fs.writeFileSync(filePath, content);
}
console.log("Updated templates");
