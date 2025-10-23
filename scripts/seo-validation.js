#!/usr/bin/env node

/**
 * SEO Validation Script
 * Checks for common SEO issues in the LMS project
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://unlockedcoding.com';
const PROJECT_ROOT = path.join(__dirname, '..');

// Issues to check for
const issues = {
  missingCanonical: [],
  duplicateCanonical: [],
  invalidCanonical: [],
  missingRobots: [],
  missingMetaDescription: [],
  missingTitle: [],
  invalidStructuredData: []
};

// Files to check
const pagesToCheck = [
  'pages/index.tsx',
  'pages/all.tsx',
  'pages/about.tsx',
  'pages/privacy.tsx',
  'pages/terms.tsx',
  'pages/r/index.tsx',
  'pages/r/[category].tsx',
  'pages/r/[category]/[course].tsx',
  'pages/r/[category]/[course]/play/index.tsx'
];

function checkFile(filePath) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  
  console.log(`\n🔍 Checking ${filePath}...`);
  
  // Check for canonical tag
  const hasCanonical = content.includes('<link rel="canonical"');
  if (!hasCanonical) {
    issues.missingCanonical.push(filePath);
    console.log('❌ Missing canonical tag');
  } else {
    console.log('✅ Has canonical tag');
  }
  
  // Check for robots meta tag
  const hasRobots = content.includes('<meta name="robots"');
  if (!hasRobots) {
    issues.missingRobots.push(filePath);
    console.log('❌ Missing robots meta tag');
  } else {
    console.log('✅ Has robots meta tag');
  }
  
  // Check for meta description
  const hasMetaDescription = content.includes('<meta name="description"');
  if (!hasMetaDescription) {
    issues.missingMetaDescription.push(filePath);
    console.log('❌ Missing meta description');
  } else {
    console.log('✅ Has meta description');
  }
  
  // Check for title tag
  const hasTitle = content.includes('<title>');
  if (!hasTitle) {
    issues.missingTitle.push(filePath);
    console.log('❌ Missing title tag');
  } else {
    console.log('✅ Has title tag');
  }
  
  // Check for structured data
  const hasStructuredData = content.includes('application/ld+json');
  if (!hasStructuredData) {
    console.log('⚠️  No structured data found');
  } else {
    console.log('✅ Has structured data');
  }
  
  // Check for double encoding in canonical URLs
  const doubleEncoded = content.includes('encodeURIComponent(encodeURIComponent(');
  if (doubleEncoded) {
    issues.invalidCanonical.push(filePath);
    console.log('❌ Double encoding detected in canonical URL');
  }
}

function generateReport() {
  console.log('\n📊 SEO Validation Report');
  console.log('========================');
  
  const totalIssues = Object.values(issues).reduce((sum, arr) => sum + arr.length, 0);
  
  if (totalIssues === 0) {
    console.log('🎉 No SEO issues found!');
    return;
  }
  
  console.log(`\n❌ Found ${totalIssues} issues:\n`);
  
  if (issues.missingCanonical.length > 0) {
    console.log('Missing Canonical Tags:');
    issues.missingCanonical.forEach(file => console.log(`  - ${file}`));
    console.log('');
  }
  
  if (issues.missingRobots.length > 0) {
    console.log('Missing Robots Meta Tags:');
    issues.missingRobots.forEach(file => console.log(`  - ${file}`));
    console.log('');
  }
  
  if (issues.missingMetaDescription.length > 0) {
    console.log('Missing Meta Descriptions:');
    issues.missingMetaDescription.forEach(file => console.log(`  - ${file}`));
    console.log('');
  }
  
  if (issues.missingTitle.length > 0) {
    console.log('Missing Title Tags:');
    issues.missingTitle.forEach(file => console.log(`  - ${file}`));
    console.log('');
  }
  
  if (issues.invalidCanonical.length > 0) {
    console.log('Invalid Canonical URLs (Double Encoding):');
    issues.invalidCanonical.forEach(file => console.log(`  - ${file}`));
    console.log('');
  }
  
  console.log('💡 Recommendations:');
  console.log('1. Add canonical tags to all pages');
  console.log('2. Add robots meta tags to control indexing');
  console.log('3. Ensure all pages have unique meta descriptions');
  console.log('4. Add structured data for better search visibility');
  console.log('5. Fix any double-encoded URLs');
}

function main() {
  console.log('🚀 Starting SEO Validation...\n');
  
  pagesToCheck.forEach(checkFile);
  
  generateReport();
  
  console.log('\n✨ SEO validation complete!');
}

if (require.main === module) {
  main();
}

module.exports = { checkFile, generateReport, issues };
