#!/usr/bin/env node

/**
 * Ping script to keep the LMS Lite site alive on Render free tier
 * This script can be run locally or via external services like UptimeRobot
 */

const https = require('https');
const http = require('http');

// Configuration
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const PING_INTERVAL = parseInt(process.env.PING_INTERVAL) || 5 * 60 * 1000; // 5 minutes
const PING_ENDPOINT = '/api/ping';
const HEALTH_ENDPOINT = '/api/health';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  const timestamp = new Date().toISOString();
  console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            data: response,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            data: data,
            success: res.statusCode >= 200 && res.statusCode < 300
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function pingSite() {
  try {
    log(`Pinging ${SITE_URL}${PING_ENDPOINT}...`, 'blue');
    
    const response = await makeRequest(`${SITE_URL}${PING_ENDPOINT}`);
    
    if (response.success) {
      log(`✅ Ping successful - Status: ${response.data.status}`, 'green');
      log(`   Uptime: ${response.data.uptime}`, 'green');
      log(`   Environment: ${response.data.environment}`, 'green');
    } else {
      log(`❌ Ping failed - Status Code: ${response.statusCode}`, 'red');
      log(`   Response: ${JSON.stringify(response.data)}`, 'red');
    }
    
    return response.success;
  } catch (error) {
    log(`❌ Ping error: ${error.message}`, 'red');
    return false;
  }
}

async function healthCheck() {
  try {
    log(`Running health check on ${SITE_URL}${HEALTH_ENDPOINT}...`, 'blue');
    
    const response = await makeRequest(`${SITE_URL}${HEALTH_ENDPOINT}`);
    
    if (response.success) {
      log(`✅ Health check passed - Status: ${response.data.status}`, 'green');
      log(`   Database: ${response.data.database.status}`, 'green');
      log(`   Response Time: ${response.data.responseTime}`, 'green');
      log(`   Memory: ${response.data.memory.used}MB / ${response.data.memory.total}MB`, 'green');
    } else {
      log(`❌ Health check failed - Status Code: ${response.statusCode}`, 'red');
      log(`   Response: ${JSON.stringify(response.data)}`, 'red');
    }
    
    return response.success;
  } catch (error) {
    log(`❌ Health check error: ${error.message}`, 'red');
    return false;
  }
}

async function runPingCycle() {
  log('🚀 Starting LMS Lite ping cycle...', 'blue');
  
  const pingSuccess = await pingSite();
  const healthSuccess = await healthCheck();
  
  if (pingSuccess && healthSuccess) {
    log('✅ All checks passed - Site is healthy and alive!', 'green');
  } else {
    log('⚠️  Some checks failed - Site may have issues', 'yellow');
  }
  
  log(`⏰ Next ping in ${PING_INTERVAL / 1000} seconds...`, 'blue');
}

// Main execution
if (require.main === module) {
  // Run once if called directly
  runPingCycle().then(() => {
    process.exit(0);
  }).catch((error) => {
    log(`💥 Fatal error: ${error.message}`, 'red');
    process.exit(1);
  });
} else {
  // Export for use in other modules
  module.exports = {
    pingSite,
    healthCheck,
    runPingCycle
  };
}
