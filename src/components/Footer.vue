<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>&copy; 2026 MyStore Inc. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Help</a>
          <a href="#">Contacts</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: white;
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--primary-color);
}

@media (max-width: 600px) {
  .footer-content {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}
</style>
