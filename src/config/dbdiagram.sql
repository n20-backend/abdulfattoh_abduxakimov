-- https://dbdiagram.io/d/67f4b4fd4f7afba184b91445

Table author {
    id UUID [pk]
    name VARCHAR(255) [not null]
    bio TEXT
    birthdate DATE
    createdAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updatedAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table genre {
    id UUID [pk]
    name VARCHAR(255) [not null]
    description TEXT
    createdAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updatedAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table book {
    id UUID [pk]
    title VARCHAR(255) [not null]
    authorId UUID [not null, ref: > author.id]
    genreId UUID [not null, ref: > genre.id]
    price DECIMAL(10, 2) [not null]
    stock INTEGER [not null]
    publishedDate DATE [not null]
    status VARCHAR(20) [not null] // ENUM('available', 'out of stock', 'discontinued')
    imageUrls TEXT[] // Array of image URLs
    description TEXT
    createdAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updatedAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table user {
    id UUID [pk]
    email VARCHAR(255) [unique, not null]
    username VARCHAR(255) [unique, not null]
    password VARCHAR(255) [not null]
    role VARCHAR(20) [not null] // ENUM('user', 'admin', 'superadmin')
    status VARCHAR(20) [not null] // ENUM('active', 'inactive')
    createdAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updatedAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}

Table order {
    id UUID [pk]
    userId UUID [not null, ref: > user.id]
    items JSONB [not null] // Array of objects: [{ "bookId": "UUID", "quantity": "integer" }]
    totalPrice DECIMAL(10, 2) [not null]
    status VARCHAR(20) [not null] // ENUM('pending', 'completed', 'canceled')
    createdAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
    updatedAt TIMESTAMP [default: `CURRENT_TIMESTAMP`]
}