#!/usr/bin/env ts-node
import enquirer from 'enquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

type ProjectOptions = {
    apiType: 'rest' | 'graphql' | 'both';
    database: 'prisma' | 'mongoose';
    features: ('auth' | 'logging' | 'swagger' | 'docker')[];
};

// Template files directory
const TEMPLATE_DIR = path.join(__dirname, '../templates');

async function init() {
    try {
        const response = await enquirer.prompt<ProjectOptions>([
        {
            type: 'select',
            name: 'apiType',
            message: 'Which API type do you want?',
            choices: [
            { name: 'rest', message: 'REST only' },
            { name: 'graphql', message: 'GraphQL only' },
            { name: 'both', message: 'Both REST and GraphQL' }
            ]
        },
        {
            type: 'select',
            name: 'database',
            message: 'Which database ORM do you want?',
            choices: [
            { name: 'prisma', message: 'Prisma (SQL)' },
            { name: 'mongoose', message: 'Mongoose (MongoDB)' }
            ]
        },
        {
            type: 'multiselect',
            name: 'features',
            message: 'Select additional features',
            choices: [
            { name: 'auth', message: 'Authentication (JWT)' },
            { name: 'logging', message: 'Request logging' },
            { name: 'swagger', message: 'Swagger documentation' },
            { name: 'docker', message: 'Docker setup' }
            ]
        }
        ]);

        setupProject(response);
    } catch (error) {
        console.error('❌ Error during project setup:', error);
        process.exit(1);
    }
}

function setupProject(options: ProjectOptions) {
    console.log('\n🚀 Creating project with:');
    console.log(`- API Type: ${options.apiType}`);
    console.log(`- Database: ${options.database}`);
    console.log(`- Features: ${options.features.join(', ') || 'None'}`);

    // 1. Create base directory structure
    const dirs = [
        'src',
        'src/config',
        'src/api',
        'src/middleware'
    ];

    if (options.apiType !== 'rest') {
        dirs.push('src/api/graphql');
    }

    dirs.forEach(dir => {
        fs.mkdirSync(path.join(process.cwd(), dir), { recursive: true });
    });

    // 2. Copy template files based on selections
    copyTemplate('base/package.json', 'package.json', options);
    
    if (options.database === 'prisma') {
        copyTemplate('prisma/schema.prisma', 'prisma/schema.prisma');
        execSync('npx prisma generate', { stdio: 'inherit' });
    }

    if (options.features.includes('auth')) {
        copyTemplate('features/auth.ts', 'src/middleware/auth.ts');
    }

    // 3. Create entry file based on API type
    if (options.apiType === 'graphql') {
        copyTemplate('graphql/app.ts', 'src/app.ts');
        copyTemplate('graphql/schema.ts', 'src/api/graphql/schema.ts');
    } else if (options.apiType === 'rest') {
        copyTemplate('rest/app.ts', 'src/app.ts');
    } else {
        copyTemplate('hybrid/app.ts', 'src/app.ts');
    }

    console.log('\n✅ Project initialized successfully!');
    console.log('Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Configure your .env file');
    console.log('3. Start development: npm run dev');
    }

function copyTemplate(templatePath: string, destination: string, options?: ProjectOptions) {
    const fullTemplatePath = path.join(TEMPLATE_DIR, templatePath);
    const destPath = path.join(process.cwd(), destination);

    if (!fs.existsSync(fullTemplatePath)) {
        throw new Error(`Template not found: ${templatePath}`);
    }

    let content = fs.readFileSync(fullTemplatePath, 'utf-8');
    
    // Apply template variables
    if (options) {
        content = content
        .replace(/{{API_TYPE}}/g, options.apiType)
        .replace(/{{DATABASE}}/g, options.database)
        .replace(/{{FEATURES}}/g, JSON.stringify(options.features));
    }

    fs.writeFileSync(destPath, content);
    console.log(`📄 Created: ${destination}`);
}

// Run the init script
init();