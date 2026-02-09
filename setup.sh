#!/bin/bash

# =============================================================================
# Vibe Coding Template - First Time Setup
# =============================================================================

set -e

echo ""
echo "⚡ Vibe Coding Template Setup"
echo "=============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if a command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 is required but not installed.${NC}"
        echo "   Please install $1 and try again."
        exit 1
    else
        echo -e "${GREEN}✓${NC} $1 found"
    fi
}

# =============================================================================
# Prerequisites Check
# =============================================================================

echo "Checking prerequisites..."
echo ""

check_command node
check_command pnpm

# Check Supabase CLI (optional but recommended)
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}✓${NC} supabase CLI found"
else
    echo -e "${YELLOW}⚠${NC} supabase CLI not found (optional)"
    echo "   Install with: brew install supabase/tap/supabase"
    echo "   Or see: https://supabase.com/docs/guides/cli"
fi

echo ""

# =============================================================================
# Environment Setup
# =============================================================================

if [ -f .env.local ]; then
    echo -e "${GREEN}✓${NC} .env.local already exists"
    echo ""
    read -p "Do you want to reconfigure? (y/N): " reconfigure
    if [[ ! $reconfigure =~ ^[Yy]$ ]]; then
        echo "Skipping environment configuration..."
    else
        rm .env.local
    fi
fi

if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Setting up environment variables..."
    echo ""
    echo "You'll need your Supabase project credentials."
    echo "Find them at: https://supabase.com/dashboard/project/_/settings/api"
    echo ""
    
    read -p "Supabase Project URL (https://xxx.supabase.co): " SUPABASE_URL
    read -p "Supabase Anon Key: " SUPABASE_ANON_KEY
    read -p "Supabase Service Role Key: " SUPABASE_SERVICE_KEY
    
    cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_KEY

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    
    echo ""
    echo -e "${GREEN}✓${NC} Created .env.local"
fi

# =============================================================================
# Install Dependencies
# =============================================================================

echo ""
echo "📦 Installing dependencies..."
pnpm install

# =============================================================================
# Generate Types (if Supabase CLI available and project linked)
# =============================================================================

if command -v supabase &> /dev/null; then
    echo ""
    echo "🔄 Attempting to generate Supabase types..."
    if pnpm supabase:types 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Types generated successfully"
    else
        echo -e "${YELLOW}⚠${NC} Could not generate types"
        echo "   Link your project first: supabase link --project-ref YOUR_PROJECT_REF"
        echo "   Then run: pnpm supabase:types"
    fi
fi

# =============================================================================
# Done!
# =============================================================================

echo ""
echo "=========================================="
echo -e "${GREEN}✅ Setup complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "  1. Start the development server:"
echo "     ${YELLOW}pnpm dev${NC}"
echo ""
echo "  2. Open your browser:"
echo "     ${YELLOW}http://localhost:3000${NC}"
echo ""
echo "  3. (Optional) Link Supabase for local development:"
echo "     ${YELLOW}supabase link --project-ref YOUR_PROJECT_REF${NC}"
echo ""
echo "Happy coding! ⚡"
echo ""
