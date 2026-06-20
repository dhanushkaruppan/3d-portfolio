import os, re

def update_page(filepath, wrapper_class, css_file, back_path):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add CSS import if not present
    if css_file not in content:
        content = content.replace('import React', f'import \'../{css_file}\';\nimport React')

    content = re.sub(r'return\s*\(\s*', f'return (\\n    <div className=\"{wrapper_class}\">\\n      ', content, count=1)
    
    last_paren = content.rfind(');')
    if last_paren != -1:
        content = content[:last_paren] + '\n    </div>\n  ' + content[last_paren:]
        
    back_button = f'''
      <div style={{{{ position: 'fixed', top: '18px', left: '20px', zIndex: 9999 }}}}>
        <Link to=\"{back_path}\" style={{{{ color: 'white', textDecoration: 'none', fontFamily: 'monospace', fontSize: '12px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }}}}>
          ← BACK TO PORTFOLIO
        </Link>
      </div>
'''
    content = content.replace(f'<div className=\"{wrapper_class}\">', f'<div className=\"{wrapper_class}\">{back_button}')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

update_page('src/projects/agri-drone/pages/Home.jsx', 'agri-drone-page', 'agri-drone.css', '/')
update_page('src/projects/agri-drone/pages/Documentation.jsx', 'agri-drone-page', 'agri-drone.css', '/')
update_page('src/projects/movie-genre/pages/Home.jsx', 'movie-genre-page', 'movie-genre.css', '/')
update_page('src/projects/movie-genre/pages/Documentation.jsx', 'movie-genre-page', 'movie-genre.css', '/')
