module.exports = {
  port: 3250,
  apiVersion: 1,
  db: {
    mongodb: {
      uri: 'mongodb://localhost:27017/bookstore-api'
    }
  },
  authentication: {
    jwt: {
      algorithm: 'RS256',
      audience: 'siam-commercial-bank',
      issuer: 'RevelLuv',
      publicKey: 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUE0VFRidDNOSXFVeG96Um5UZURwQwpUcUNEWlpvbGZUaUxFN29YeE0xTHpsUlppMS81NXBSNUVJTUR4YUZRbGJQQjFkUEZDMWN4VHdlU2t4VDZTcFR5CmhSU1BzNXlsdkxkRlhwcVowb3h5NnQ4anFTTVF3ZFRYQldTWG15a2xtaUpuNHI2STVES0VaeStGTnRPcTFuWnUKUXczV25YSDVtOUl2TU1ITURmandEdE9UMmNZZUlWQmdyN1BUZVlBQXZ2amN0UnFtaSt6OEVWbHRnTm1hSHVxRgpLTDY0UGJadjhHNUVWUEh4d3BjWWs0QVRZczNHNkdzWG5QOGgrbjhvci80RkxkTklXV0JmanFrNlVUN013UGNJCi95WjdNOWs5Q1FCRFpsRFdlU0RkR2ttaTNpdHpqdGlyME5qNmxONlozR1RWR0YyWUlFUDhHZkZaU1FlYlVvK1cKMlFJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==',
      privateKey: 'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBNFRUYnQzTklxVXhvelJuVGVEcENUcUNEWlpvbGZUaUxFN29YeE0xTHpsUlppMS81CjVwUjVFSU1EeGFGUWxiUEIxZFBGQzFjeFR3ZVNreFQ2U3BUeWhSU1BzNXlsdkxkRlhwcVowb3h5NnQ4anFTTVEKd2RUWEJXU1hteWtsbWlKbjRyNkk1REtFWnkrRk50T3Exblp1UXczV25YSDVtOUl2TU1ITURmandEdE9UMmNZZQpJVkJncjdQVGVZQUF2dmpjdFJxbWkrejhFVmx0Z05tYUh1cUZLTDY0UGJadjhHNUVWUEh4d3BjWWs0QVRZczNHCjZHc1huUDhoK244b3IvNEZMZE5JV1dCZmpxazZVVDdNd1BjSS95WjdNOWs5Q1FCRFpsRFdlU0RkR2ttaTNpdHoKanRpcjBOajZsTjZaM0dUVkdGMllJRVA4R2ZGWlNRZWJVbytXMlFJREFRQUJBb0lCQVFDS2VpQW9XNER3YVFXQQpLRU02Q0VqQlpEMm5lZk5YWGk5V2YvVWhsRUxxcWo4dFRtU3hmZFk3YXZRa3o1NW5qdEsva3FuMDRUWjJxK2RhCi9Xa3g5d2h4QUVXa1ljd2ZrR25kVkI4RnNrcnZWU251Vkp0M05GTExCQ0djek41TU9wKzZjd0psbnhKL0NGOVgKYVN3QkYyMlJXYTcvdlJlSTB1TWxqZVRWS3A4aDNadnN1dHhQOHZmYWcySmdlUnFRdTVES1dtOWhxWEo5OUZqUQpMeHJEcTJaOGFXOEtCWWJ5MlZodkcrWVlEN2N2Q01xWWk4TE9oQ1ZoTW4zMkIrNHo1elNZVW41WUdpK0l2T0VQCkNITEdhZXMyUi9BVjJLK3RIQzl6ZU9vSXJvWFZCc3EzUjFIOE13REplUUdxVnNNd1IyNEMxNEx0eTVzaitWU2gKUVBML0NqUnBBb0dCQVBrdlpMYkRYcXJaMlc3RGlYTnpvRW5OSHVsYXp4djhEdjE4UzFZTXIydVhOVkR6elpBdgozNElkTU43RE5ERnRndHRTZG5ZclI4cDdyWnk4dEFrenozd0RQNlp6MHkvL01yMmpUWFZtMGhoTW5YUUVPclJVCkc0RzRSTWtSOUpnVytlQk5JQldHeEFZQlhrTWF4TW8razUzVXJjODNmT3BSMnFheG95MWNpZUJEQW9HQkFPZGQKbFpwNXRiNEltbVFUa1JGWGpoUS9RdVFCamlvSU5pNHM0ZzAzb21TeVIyY1d3UnpqVGc0Tm1JTFh6M1pSOW1ZSgpOZ3RRcDFLOHhPY3UvZzZtekp6UDBNUXNBeEY3SWJTZkpPYVdNclBXYUdrL1N2TFY3YWpSVTljM29FRGZ0UXgxCjNoQ1I4K21YS0dxOXB3VnVBTXVwUGxjWlpjZFgrVVNwT0hlckFKaXpBb0dCQU1DODByYTJpTXUzc3dHRWh4VmcKc3ZOQ2tBMUk2dmNuVUdUcXRjNjZBeGxDSE1BZnc3a3Ava1JDMWVFSHRhQWhwMXlDL1JQTHlEeXF5dzkzdWYyQQpNSlVvWWh3YWJKZ3NXUS9yZHVjKy8zUkNGbXQ5TmZiek0wOXp1dWlYVmN3cHdWNm42UkFkYkJPRkRXYjBGcENrCk5FT1pGRk02QlFtdEJHVjQ4dEVNU2F6SEFvR0FMMUxnRDluSFI5aUFvK213cVloc0lrNFNRNHJoNWswSnNBWTAKTXBubm1Jc3l1YTVZejZ6YXdWc2NqOTdPcTVmMk8wYTFERGx5RUNWV2JTY2FoaXF0L1lFd1pYL1BITnMvdUs4NApvQVdtMTB3S3pVUko4ME80dWVnZkt3MVF0UlJNOXdDQTdJaStDRkNIenRWOS9VbFQxbFNHME0vOEZuc3pIRTAwCnBKMlFvS3NDZ1lCSkxiUTBZd2FNMDIxTWFrOEh3Umg1MCtFRGNpazh2Vi9jc1cwbVNKV2Y2aldnOTRGQnBzZTIKL2dVWk52SjQ3aWZvcmZ3cE9zUkZmZ2hBb0duZzhDQXNLdGhmV1NTdUJlbUtNMXRHRWVnekp0dG5PRSt4cWdibQpZWFJHc1hjNmliZ09pYkxpN3FHa2R4NlhtZzNVUmJldk9JWjlZWE1XMkJtaXV1ZjlxKzYrOHc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo='
    }
  },
  cache: {
    redis: {
      uri: 'redis://localhost:6379'
    }
  }
}