#!/usr/bin/env node

/**
 * SEO Audit and Fix Script for LMS Lite
 * This script identifies and helps fix common SEO issues
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://unlockedcoding.com';
const PAGES_DIR = './pages';
const ISSUES_FOUND = [];

// Common SEO issues to check for
const SEO_CHECKS = {
  missingCanonical: {
    pattern: /<link\s+rel=["']canonical["']/,
    message: 'Missing canonical tag',
    severity: 'high'
  },
  missingMetaDescription: {
    pattern: /<meta\s+name=["']description["']/,
    message: 'Missing meta description',
    severity: 'high'
  },
  missingTitle: {
    pattern: /<title>/,
    message: 'Missing title tag',
    severity: 'high'
  },
  missingRobots: {
    pattern: /<meta\s+name=["']robots["']/,
    message: 'Missing robots meta tag',
    severity: 'medium'
  },
  missingOpenGraph: {
    pattern: /<meta\s+property=["']og:/,
    message: 'Missing Open Graph tags',
    severity: 'medium'
  },
  missingStructuredData: {
    pattern: /<script[^>]*type=["']application\/ld\+json["']/,
    message: 'Missing structured data',
    severity: 'low'
  },
  duplicateCanonical: {
    pattern: /<link\s+rel=["']canonical["'][^>]*>/g,
    message: 'Duplicate canonical tags',
    severity: 'high'
  },
  invalidCanonical: {
    pattern: /<link\s+rel=["']canonical["']\s+href=["'](?!https?:\/\/)/,
    message: 'Invalid canonical URL (not absolute)',
    severity: 'high'
  }
};

function scanFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for each SEO issue
    Object.entries(SEO_CHECKS).forEach(([checkName, check]) => {
      const matches = content.match(check.pattern);
      
      if (checkName === 'missingCanonical' || checkName === 'missingMetaDescription' || 
          checkName === 'missingTitle' || checkName === 'missingRobots' || 
          checkName === 'missingOpenGraph' || checkName === 'missingStructuredData') {
        if (!matches) {
          issues.push({
            type: checkName,
            message: check.message,
            severity: check.severity,
            line: findLineNumber(content, check.pattern)
          });
        }
      } else if (checkName === 'duplicateCanonical') {
        if (matches && matches.length > 1) {
          issues.push({
            type: checkName,
            message: check.message,
            severity: check.severity,
            line: findLineNumber(content, check.pattern)
          });
        }
      } else if (checkName === 'invalidCanonical') {
        if (matches) {
          issues.push({
            type: checkName,
            message: check.message,
            severity: check.severity,
            line: findLineNumber(content, check.pattern)
          });
        }
      }
    });
    
    return issues;
  } catch (error) {
    console.error(`Error scanning file ${filePath}:`, error.message);
    return [];
  }
}

function findLineNumber(content, pattern) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      return i + 1;
    }
  }
  return null;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const issues = scanFile(filePath);
      if (issues.length > 0) {
        ISSUES_FOUND.push({
          file: filePath,
          issues: issues
        });
      }
    }
  });
}

function generateReport() {
  console.log('\n🔍 SEO Audit Report for LMS Lite');
  console.log('=====================================\n');
  
  if (ISSUES_FOUND.length === 0) {
    console.log('✅ No SEO issues found!');
    return;
  }
  
  // Group issues by severity
  const highSeverity = [];
  const mediumSeverity = [];
  const lowSeverity = [];
  
  ISSUES_FOUND.forEach(file => {
    file.issues.forEach(issue => {
      const issueWithFile = { ...issue, file: file.file };
      if (issue.severity === 'high') {
        highSeverity.push(issueWithFile);
      } else if (issue.severity === 'medium') {
        mediumSeverity.push(issueWithFile);
      } else {
        lowSeverity.push(issueWithFile);
      }
    });
  });
  
  // Print high severity issues
  if (highSeverity.length > 0) {
    console.log('🚨 HIGH SEVERITY ISSUES:');
    console.log('========================\n');
    highSeverity.forEach(issue => {
      console.log(`❌ ${issue.file}:${issue.line || '?'} - ${issue.message}`);
    });
    console.log('');
  }
  
  // Print medium severity issues
  if (mediumSeverity.length > 0) {
    console.log('⚠️  MEDIUM SEVERITY ISSUES:');
    console.log('===========================\n');
    mediumSeverity.forEach(issue => {
      console.log(`⚠️  ${issue.file}:${issue.line || '?'} - ${issue.message}`);
    });
    console.log('');
  }
  
  // Print low severity issues
  if (lowSeverity.length > 0) {
    console.log('ℹ️  LOW SEVERITY ISSUES:');
    console.log('=======================\n');
    lowSeverity.forEach(issue => {
      console.log(`ℹ️  ${issue.file}:${issue.line || '?'} - ${issue.message}`);
    });
    console.log('');
  }
  
  // Summary
  console.log('📊 SUMMARY:');
  console.log('===========');
  console.log(`Total files with issues: ${ISSUES_FOUND.length}`);
  console.log(`High severity issues: ${highSeverity.length}`);
  console.log(`Medium severity issues: ${mediumSeverity.length}`);
  console.log(`Low severity issues: ${lowSeverity.length}`);
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('===================');
  console.log('1. Fix all high severity issues immediately');
  console.log('2. Add missing canonical tags to all pages');
  console.log('3. Ensure all URLs are properly encoded');
  console.log('4. Add structured data to improve rich snippets');
  console.log('5. Implement proper meta robots tags');
  console.log('6. Create a dynamic sitemap.xml');
  console.log('7. Add proper Open Graph tags for social sharing');
  
  // Generate fix suggestions
  generateFixSuggestions();
}

function generateFixSuggestions() {
  console.log('\n🔧 FIX SUGGESTIONS:');
  console.log('===================');
  
  const suggestions = [
    {
      issue: 'Missing canonical tags',
      fix: 'Add <link rel="canonical" href="https://unlockedcoding.com/..." /> to all pages'
    },
    {
      issue: 'URL encoding issues',
      fix: 'Use encodeURIComponent() for dynamic URLs in canonical tags'
    },
    {
      issue: 'Missing meta robots',
      fix: 'Add <meta name="robots" content="index, follow" /> to all pages'
    },
    {
      issue: 'Missing structured data',
      fix: 'Add JSON-LD structured data for courses, categories, and instructors'
    },
    {
      issue: 'Sitemap issues',
      fix: 'Create dynamic sitemap.xml.tsx to include all pages'
    }
  ];
  
  suggestions.forEach((suggestion, index) => {
    console.log(`${index + 1}. ${suggestion.issue}:`);
    console.log(`   ${suggestion.fix}\n`);
  });
}

// Main execution
console.log('Starting SEO audit...\n');
scanDirectory(PAGES_DIR);
generateReport();

// Exit with appropriate code
const highSeverityCount = ISSUES_FOUND.reduce((count, file) => 
  count + file.issues.filter(issue => issue.severity === 'high').length, 0
);

process.exit(highSeverityCount > 0 ? 1 : 0);
