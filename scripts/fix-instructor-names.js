const fs = require('fs');
const path = require('path');

// Function to fix instructor names in all course JSON files
function fixInstructorNames() {
  try {
    const coursesPath = path.join(process.cwd(), 'courses');
    const files = fs.readdirSync(coursesPath);
    
    let updatedFiles = 0;
    let totalFiles = 0;
    
    console.log('🔧 Starting instructor name fixes...\n');
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        totalFiles++;
        const filePath = path.join(coursesPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        try {
          const data = JSON.parse(fileContent);
          
          if (data.instructorname && typeof data.instructorname === 'string') {
            const originalName = data.instructorname;
            const fixedName = originalName.replace(/\s+/g, '-');
            
            if (originalName !== fixedName) {
              data.instructorname = fixedName;
              
              // Write the updated JSON back to file
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
              
              console.log(`✅ Fixed: ${file}`);
              console.log(`   "${originalName}" → "${fixedName}"`);
              updatedFiles++;
            } else {
              console.log(`⏭️  No change needed: ${file}`);
            }
          } else {
            console.log(`⚠️  No instructor name found: ${file}`);
          }
        } catch (err) {
          console.error(`❌ Error parsing ${file}:`, err.message);
        }
      }
    });
    
    console.log(`\n🎉 Fix completed!`);
    console.log(`📊 Total files processed: ${totalFiles}`);
    console.log(`🔧 Files updated: ${updatedFiles}`);
    console.log(`⏭️  Files unchanged: ${totalFiles - updatedFiles}`);
    
  } catch (error) {
    console.error('❌ Error fixing instructor names:', error);
    process.exit(1);
  }
}

// Run the script
fixInstructorNames();
