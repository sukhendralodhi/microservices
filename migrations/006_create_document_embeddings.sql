CREATE TABLE document_embeddings (
    ID SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    metadata JSONB,
    embedding VECTOR(3072)
)